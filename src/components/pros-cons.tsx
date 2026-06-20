"use client";

import { useId, useState, useSyncExternalStore } from "react";
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

type Side = "pros" | "cons";

type Item = {
  id: string;
  text: string;
};

type Lists = Record<Side, Item[]>;

type DragState = {
  side: Side;
  index: number;
};

const STORAGE_KEY = "compara-casa:pros-cons";

function emptyLists(): Lists {
  return { pros: [], cons: [] };
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadLists(): Lists {
  if (typeof window === "undefined") return emptyLists();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyLists();
    const parsed = JSON.parse(raw) as Partial<Lists>;
    const normalize = (items: unknown): Item[] =>
      Array.isArray(items)
        ? items
            .filter(
              (item): item is Item =>
                typeof item === "object" &&
                item !== null &&
                typeof (item as Item).id === "string" &&
                typeof (item as Item).text === "string",
            )
            .map((item) => ({ id: item.id, text: item.text }))
        : [];
    return { pros: normalize(parsed.pros), cons: normalize(parsed.cons) };
  } catch {
    return emptyLists();
  }
}

// localStorage-backed store consumed via useSyncExternalStore. This keeps the
// lists persistent across reloads and SSR-safe without calling setState in an
// effect (server renders the stable empty snapshot, the client re-reads after
// hydration).
const SERVER_SNAPSHOT: Lists = emptyLists();
const storeListeners = new Set<() => void>();
let storeSnapshot: Lists | null = null;

function getStoreSnapshot(): Lists {
  if (storeSnapshot === null) {
    storeSnapshot = loadLists();
  }
  return storeSnapshot;
}

function getServerSnapshot(): Lists {
  return SERVER_SNAPSHOT;
}

function subscribeToStore(callback: () => void): () => void {
  storeListeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      storeSnapshot = null;
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    storeListeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function setStoreLists(updater: (current: Lists) => Lists) {
  const next = updater(getStoreSnapshot());
  storeSnapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage failures (e.g. private mode / quota).
  }
  storeListeners.forEach((listener) => listener());
}

const SIDE_META: Record<
  Side,
  { title: string; description: string; icon: typeof ThumbsUp; accent: string }
> = {
  pros: {
    title: "Positives",
    description: "Things that count in this house's favour.",
    icon: ThumbsUp,
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  cons: {
    title: "Negatives",
    description: "Things that count against this house.",
    icon: ThumbsDown,
    accent: "text-rose-600 dark:text-rose-400",
  },
};

export function ProsCons() {
  const lists = useSyncExternalStore(
    subscribeToStore,
    getStoreSnapshot,
    getServerSnapshot,
  );
  const [drafts, setDrafts] = useState<Record<Side, string>>({
    pros: "",
    cons: "",
  });
  const [dragging, setDragging] = useState<DragState | null>(null);
  const [dropTarget, setDropTarget] = useState<DragState | null>(null);
  const baseId = useId();

  function setLists(updater: (current: Lists) => Lists) {
    setStoreLists(updater);
  }

  function addItem(side: Side) {
    const text = drafts[side].trim();
    if (!text) return;
    setLists((prev) => ({
      ...prev,
      [side]: [...prev[side], { id: createId(), text }],
    }));
    setDrafts((prev) => ({ ...prev, [side]: "" }));
  }

  function updateItem(side: Side, id: string, text: string) {
    setLists((prev) => ({
      ...prev,
      [side]: prev[side].map((item) =>
        item.id === id ? { ...item, text } : item,
      ),
    }));
  }

  function removeItem(side: Side, id: string) {
    setLists((prev) => ({
      ...prev,
      [side]: prev[side].filter((item) => item.id !== id),
    }));
  }

  // Move an item from one position to another (within or across lists).
  function moveItem(from: DragState, to: DragState) {
    setLists((prev) => {
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
      {(Object.keys(SIDE_META) as Side[]).map((side) => {
        const meta = SIDE_META[side];
        const Icon = meta.icon;
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
              <CardTitle className={cn("flex items-center gap-2", meta.accent)}>
                <Icon className="size-4" aria-hidden />
                {meta.title}
                <span className="ml-auto text-xs font-normal text-muted-foreground">
                  {items.length}
                </span>
              </CardTitle>
              <CardDescription>{meta.description}</CardDescription>
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
                        value={item.text}
                        aria-label={`${meta.title} item ${index + 1}`}
                        onChange={(event) =>
                          updateItem(side, item.id, event.target.value)
                        }
                        className="h-7 border-transparent bg-transparent px-1 focus-visible:border-input"
                      />

                      <div className="flex items-center opacity-100 md:opacity-0 md:transition-opacity md:group-hover/item:opacity-100 md:group-focus-within/item:opacity-100">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Move up"
                          disabled={index === 0}
                          onClick={() => reorder(side, index, -1)}
                        >
                          <ArrowUp />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Move down"
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
                              ? "Move to negatives"
                              : "Move to positives"
                          }
                          onClick={() => switchSide(side, index)}
                        >
                          <ArrowLeftRight />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Remove"
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
                      ? "Drop here"
                      : "Nothing yet — add a line below or drag one here."}
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
                  Add a {meta.title.toLowerCase()} item
                </label>
                <Input
                  id={draftInputId}
                  value={drafts[side]}
                  placeholder={
                    side === "pros" ? "Add a positive…" : "Add a negative…"
                  }
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
                  aria-label={`Add ${meta.title.toLowerCase()} item`}
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
