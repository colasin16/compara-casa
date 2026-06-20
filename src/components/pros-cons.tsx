"use client";

import { useId, useRef, useState, useTransition } from "react";
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowUp,
  GripVertical,
  Plus,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { saveHousePoints } from "@/app/houses/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n/context";
import type { HousePoint, HousePointKind } from "@/lib/types";

type Side = "pros" | "cons";

type Item = {
  id: string;
  body: string;
};

type Lists = Record<Side, Item[]>;

type DragState = {
  side: Side;
  index: number;
};

const SIDE_TO_KIND: Record<Side, HousePointKind> = { pros: "pro", cons: "con" };

function emptyLists(): Lists {
  return { pros: [], cons: [] };
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // RFC 4122 version 4 fallback (the id column is a uuid).
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => {
    const n = Number(c);
    return (
      n ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (n / 4)))
    ).toString(16);
  });
}

function pointsToLists(points: HousePoint[]): Lists {
  const lists = emptyLists();
  for (const point of [...points].sort((a, b) => a.position - b.position)) {
    const side: Side = point.kind === "con" ? "cons" : "pros";
    lists[side].push({ id: point.id, body: point.body });
  }
  return lists;
}

// Flatten the two ordered lists into the snapshot the server expects.
function listsToSnapshot(lists: Lists) {
  return (Object.keys(SIDE_TO_KIND) as Side[]).flatMap((side) =>
    lists[side].map((item) => ({
      id: item.id,
      kind: SIDE_TO_KIND[side],
      body: item.body,
    })),
  );
}

const SIDE_VISUALS: Record<
  Side,
  { icon: typeof ThumbsUp; accent: string }
> = {
  pros: {
    icon: ThumbsUp,
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  cons: {
    icon: ThumbsDown,
    accent: "text-rose-600 dark:text-rose-400",
  },
};

export function ProsCons({
  houseId,
  initialPoints,
}: {
  houseId: string;
  initialPoints: HousePoint[];
}) {
  const [lists, setLists] = useState<Lists>(() => pointsToLists(initialPoints));
  const [drafts, setDrafts] = useState<Record<Side, string>>({
    pros: "",
    cons: "",
  });
  const [dragging, setDragging] = useState<DragState | null>(null);
  const [dropTarget, setDropTarget] = useState<DragState | null>(null);
  const [, startTransition] = useTransition();
  const baseId = useId();
  const t = useTranslations();

  const sideText = (side: Side) => ({
    title: side === "pros" ? t("prosCons.prosTitle") : t("prosCons.consTitle"),
    description:
      side === "pros"
        ? t("prosCons.prosDescription")
        : t("prosCons.consDescription"),
    placeholder:
      side === "pros"
        ? t("prosCons.prosPlaceholder")
        : t("prosCons.consPlaceholder"),
  });

  // Snapshot of the body when an input gains focus, so blur only persists when
  // the text actually changed.
  const editingFrom = useRef<string | null>(null);

  function persist(next: Lists) {
    startTransition(async () => {
      const result = await saveHousePoints(houseId, listsToSnapshot(next));
      if (result?.error) {
        toast.error(t("prosCons.saveError", { error: result.error }));
      }
    });
  }

  // Apply a list change locally and persist the new snapshot.
  function commit(updater: (current: Lists) => Lists) {
    const next = updater(lists);
    if (next === lists) return;
    setLists(next);
    persist(next);
  }

  function addItem(side: Side) {
    const body = drafts[side].trim();
    if (!body) return;
    commit((prev) => ({
      ...prev,
      [side]: [...prev[side], { id: createId(), body }],
    }));
    setDrafts((prev) => ({ ...prev, [side]: "" }));
  }

  // Local-only text edit; persistence happens on blur (see commitTextIfChanged).
  function editText(side: Side, id: string, body: string) {
    setLists({
      ...lists,
      [side]: lists[side].map((item) =>
        item.id === id ? { ...item, body } : item,
      ),
    });
  }

  function commitTextIfChanged(side: Side, id: string) {
    const current = lists[side].find((item) => item.id === id);
    const from = editingFrom.current;
    editingFrom.current = null;
    if (!current) return;
    if (current.body.trim().length === 0) {
      // Empty lines are removed rather than persisted (body has a min length).
      commit((prev) => ({
        ...prev,
        [side]: prev[side].filter((item) => item.id !== id),
      }));
    } else if (from !== current.body) {
      persist(lists);
    }
  }

  function removeItem(side: Side, id: string) {
    commit((prev) => ({
      ...prev,
      [side]: prev[side].filter((item) => item.id !== id),
    }));
  }

  // Move an item from one position to another (within or across lists).
  function moveItem(from: DragState, to: DragState) {
    commit((prev) => {
      const next: Lists = { pros: [...prev.pros], cons: [...prev.cons] };
      const [moved] = next[from.side].splice(from.index, 1);
      if (!moved) return prev;

      let targetIndex = to.index;
      // Removing from the same list before the insertion point shifts it left.
      if (from.side === to.side && from.index < targetIndex) {
        targetIndex -= 1;
      }
      targetIndex = Math.max(0, Math.min(targetIndex, next[to.side].length));
      next[to.side].splice(targetIndex, 0, moved);
      return next;
    });
  }

  function switchSide(side: Side, index: number) {
    const other: Side = side === "pros" ? "cons" : "pros";
    moveItem({ side, index }, { side: other, index: lists[other].length });
  }

  function reorder(side: Side, index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= lists[side].length) return;
    moveItem(
      { side, index },
      { side, index: direction === 1 ? target + 1 : target },
    );
  }

  function handleDrop(to: DragState) {
    if (dragging) moveItem(dragging, to);
    setDragging(null);
    setDropTarget(null);
  }

  const isDragging = dragging !== null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {(Object.keys(SIDE_VISUALS) as Side[]).map((side) => {
        const visuals = SIDE_VISUALS[side];
        const text = sideText(side);
        const Icon = visuals.icon;
        const items = lists[side];
        const draftInputId = `${baseId}-${side}-draft`;
        const isColumnDropTarget =
          isDragging &&
          dropTarget?.side === side &&
          dropTarget.index >= items.length;

        return (
          <Card
            key={side}
            className={cn(
              "transition-colors",
              isColumnDropTarget && "ring-2 ring-ring",
            )}
            onDragOver={(event) => {
              if (!isDragging) return;
              event.preventDefault();
              setDropTarget({ side, index: items.length });
            }}
            onDrop={(event) => {
              if (!isDragging) return;
              event.preventDefault();
              handleDrop({ side, index: items.length });
            }}
          >
            <CardHeader>
              <CardTitle className={cn("flex items-center gap-2", visuals.accent)}>
                <Icon className="size-4" aria-hidden />
                {text.title}
                <span className="ml-auto text-xs font-normal text-muted-foreground">
                  {items.length}
                </span>
              </CardTitle>
              <CardDescription>{text.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
              <ul className="flex flex-col gap-2">
                {items.map((item, index) => {
                  const showIndicator =
                    isDragging &&
                    dropTarget?.side === side &&
                    dropTarget.index === index;

                  return (
                    <li
                      key={item.id}
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.effectAllowed = "move";
                        setDragging({ side, index });
                      }}
                      onDragEnd={() => {
                        setDragging(null);
                        setDropTarget(null);
                      }}
                      onDragOver={(event) => {
                        if (!isDragging) return;
                        event.preventDefault();
                        const rect =
                          event.currentTarget.getBoundingClientRect();
                        const after =
                          event.clientY - rect.top > rect.height / 2;
                        setDropTarget({
                          side,
                          index: after ? index + 1 : index,
                        });
                      }}
                      onDrop={(event) => {
                        if (!isDragging) return;
                        event.preventDefault();
                        event.stopPropagation();
                        const rect =
                          event.currentTarget.getBoundingClientRect();
                        const after =
                          event.clientY - rect.top > rect.height / 2;
                        handleDrop({ side, index: after ? index + 1 : index });
                      }}
                      className={cn(
                        "group/item flex items-center gap-1 rounded-lg border bg-background px-1.5 py-1 transition-shadow",
                        showIndicator && "border-t-2 border-t-ring",
                        dragging?.side === side &&
                          dragging.index === index &&
                          "opacity-50",
                      )}
                    >
                      <span
                        className="flex size-7 cursor-grab items-center justify-center text-muted-foreground active:cursor-grabbing"
                        aria-hidden
                      >
                        <GripVertical className="size-4" />
                      </span>

                      <Input
                        value={item.body}
                        aria-label={t("prosCons.itemLabel", {
                          label: text.title,
                          index: index + 1,
                        })}
                        onFocus={() => {
                          editingFrom.current = item.body;
                        }}
                        onChange={(event) =>
                          editText(side, item.id, event.target.value)
                        }
                        onBlur={() => commitTextIfChanged(side, item.id)}
                        className="h-7 border-transparent bg-transparent px-1 focus-visible:border-input"
                      />

                      <div className="flex items-center opacity-100 md:opacity-0 md:transition-opacity md:group-hover/item:opacity-100 md:group-focus-within/item:opacity-100">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-label={t("prosCons.moveUp")}
                          disabled={index === 0}
                          onClick={() => reorder(side, index, -1)}
                        >
                          <ArrowUp />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-label={t("prosCons.moveDown")}
                          disabled={index === items.length - 1}
                          onClick={() => reorder(side, index, 1)}
                        >
                          <ArrowDown />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-label={
                            side === "pros"
                              ? t("prosCons.moveToCons")
                              : t("prosCons.moveToPros")
                          }
                          onClick={() => switchSide(side, index)}
                        >
                          <ArrowLeftRight />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-label={t("prosCons.remove")}
                          onClick={() => removeItem(side, item.id)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </li>
                  );
                })}

                {items.length === 0 ? (
                  <li className="rounded-lg border border-dashed px-3 py-4 text-center text-xs text-muted-foreground">
                    {isDragging
                      ? t("prosCons.dropHere")
                      : t("prosCons.empty")}
                  </li>
                ) : null}
              </ul>

              <form
                className="flex items-center gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  addItem(side);
                }}
              >
                <label htmlFor={draftInputId} className="sr-only">
                  {t("prosCons.addItemLabel", { label: text.title })}
                </label>
                <Input
                  id={draftInputId}
                  value={drafts[side]}
                  placeholder={text.placeholder}
                  onChange={(event) =>
                    setDrafts((prev) => ({
                      ...prev,
                      [side]: event.target.value,
                    }))
                  }
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="outline"
                  aria-label={t("prosCons.addItemLabel", { label: text.title })}
                  disabled={drafts[side].trim().length === 0}
                >
                  <Plus />
                </Button>
              </form>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
