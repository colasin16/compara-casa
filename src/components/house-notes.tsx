"use client";

import { useId, useRef, useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { saveHouseNotes } from "@/app/houses/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/lib/i18n/context";
import type { HouseNote } from "@/lib/types";

type Item = {
  id: string;
  body: string;
};

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

function notesToItems(notes: HouseNote[]): Item[] {
  return [...notes]
    .sort((a, b) => a.position - b.position)
    .map((note) => ({ id: note.id, body: note.body }));
}

export function HouseNotes({
  houseId,
  initialNotes,
}: {
  houseId: string;
  initialNotes: HouseNote[];
}) {
  const [items, setItems] = useState<Item[]>(() => notesToItems(initialNotes));
  const [draft, setDraft] = useState("");
  const [, startTransition] = useTransition();
  const baseId = useId();
  const t = useTranslations();

  // Snapshot of the body when an input gains focus, so blur only persists when
  // the text actually changed.
  const editingFrom = useRef<string | null>(null);

  function persist(next: Item[]) {
    startTransition(async () => {
      const result = await saveHouseNotes(
        houseId,
        next.map((item) => ({ id: item.id, body: item.body })),
      );
      if (result?.error) {
        toast.error(t("houseNotes.saveError", { error: result.error }));
      }
    });
  }

  function commit(updater: (current: Item[]) => Item[]) {
    const next = updater(items);
    if (next === items) return;
    setItems(next);
    persist(next);
  }

  function addItem() {
    const body = draft.trim();
    if (!body) return;
    commit((prev) => [...prev, { id: createId(), body }]);
    setDraft("");
  }

  // Local-only text edit; persistence happens on blur (see commitTextIfChanged).
  function editText(id: string, body: string) {
    setItems(items.map((item) => (item.id === id ? { ...item, body } : item)));
  }

  function commitTextIfChanged(id: string) {
    const current = items.find((item) => item.id === id);
    const from = editingFrom.current;
    editingFrom.current = null;
    if (!current) return;
    if (current.body.trim().length === 0) {
      // Empty notes are removed rather than persisted (body has a min length).
      commit((prev) => prev.filter((item) => item.id !== id));
    } else if (from !== current.body) {
      persist(items);
    }
  }

  function removeItem(id: string) {
    commit((prev) => prev.filter((item) => item.id !== id));
  }

  const draftInputId = `${baseId}-draft`;

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="group/item flex items-start gap-1 rounded-lg border bg-background p-1.5"
          >
            <Textarea
              value={item.body}
              rows={1}
              aria-label={t("houseNotes.itemLabel", { index: index + 1 })}
              onFocus={() => {
                editingFrom.current = item.body;
              }}
              onChange={(event) => editText(item.id, event.target.value)}
              onBlur={() => commitTextIfChanged(item.id)}
              className="min-h-9 resize-none border-transparent bg-transparent px-2 py-1.5 focus-visible:border-input"
            />

            <div className="flex items-center opacity-100 md:opacity-0 md:transition-opacity md:group-hover/item:opacity-100 md:group-focus-within/item:opacity-100">
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={t("houseNotes.remove")}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 />
              </Button>
            </div>
          </li>
        ))}

        {items.length === 0 ? (
          <li className="rounded-lg border border-dashed px-3 py-4 text-center text-xs text-muted-foreground">
            {t("houseNotes.empty")}
          </li>
        ) : null}
      </ul>

      <form
        className="flex items-start gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          addItem();
        }}
      >
        <label htmlFor={draftInputId} className="sr-only">
          {t("houseNotes.addNoteLabel")}
        </label>
        <Textarea
          id={draftInputId}
          value={draft}
          rows={1}
          placeholder={t("houseNotes.placeholder")}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              event.preventDefault();
              addItem();
            }
          }}
          className="min-h-10"
        />
        <Button
          type="submit"
          size="icon"
          variant="outline"
          aria-label={t("houseNotes.addNoteLabel")}
          disabled={draft.trim().length === 0}
        >
          <Plus />
        </Button>
      </form>
    </div>
  );
}
