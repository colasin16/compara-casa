"use client";

import Link from "next/link";
import { Check, CircleSmall, NotebookPen, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";
import type { HousePointsList, HouseWithScore } from "@/lib/queries";

type Side = "pros" | "cons";

type Props = {
  houses: HouseWithScore[];
  pointsByHouseId: Record<string, HousePointsList>;
  notesByHouseId: Record<string, string[]>;
};

/** Side-by-side list of every house's positives or negatives. */
function PointsSection({
  side,
  houses,
  pointsByHouseId,
}: {
  side: Side;
  houses: HouseWithScore[];
  pointsByHouseId: Record<string, HousePointsList>;
}) {
  const t = useTranslations();

  const isPros = side === "pros";
  const title = isPros
    ? t("compare.positivesTitle")
    : t("compare.negativesTitle");
  const subtitle = isPros
    ? t("compare.positivesSubtitle")
    : t("compare.negativesSubtitle");
  const Icon = isPros ? ThumbsUp : ThumbsDown;
  const BulletIcon = isPros ? Check : X;
  const accent = isPros
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-rose-600 dark:text-rose-400";

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <Icon className={`size-4 ${accent}`} aria-hidden />
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{subtitle}</p>

      <div className="grid auto-cols-[minmax(14rem,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2">
        {houses.map((house) => {
          const items = pointsByHouseId[house.id]?.[side] ?? [];
          return (
            <div
              key={house.id}
              className="flex flex-col gap-2 rounded-xl border border-border p-4"
            >
              <Link
                href={`/dashboard/houses/${house.id}`}
                className="truncate font-semibold hover:text-primary"
              >
                {house.name}
              </Link>
              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-1.5 py-5 text-center">
                  <Icon
                    className="size-5 text-muted-foreground/20"
                    aria-hidden
                  />
                  <p className="text-xs text-muted-foreground/40">
                    {t("compare.noPoints")}
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-1.5 text-sm">
                  {items.map((body, index) => (
                    <li key={index} className="flex items-start gap-1.5 text-pretty">
                      <BulletIcon className={`mt-0.5 size-3.5 shrink-0 ${accent}`} aria-hidden />
                      {body}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Side-by-side list of every house's free-form notes. */
function NotesSection({
  houses,
  notesByHouseId,
}: {
  houses: HouseWithScore[];
  notesByHouseId: Record<string, string[]>;
}) {
  const t = useTranslations();

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <NotebookPen
          className="size-4 text-sky-600 dark:text-sky-400"
          aria-hidden
        />
        <h3 className="text-base font-semibold tracking-tight">
          {t("compare.notesTitle")}
        </h3>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        {t("compare.notesSubtitle")}
      </p>

      <div className="grid auto-cols-[minmax(14rem,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2">
        {houses.map((house) => {
          const items = notesByHouseId[house.id] ?? [];
          return (
            <div
              key={house.id}
              className="flex flex-col gap-2 rounded-xl border border-border p-4"
            >
              <Link
                href={`/dashboard/houses/${house.id}`}
                className="truncate font-semibold hover:text-primary"
              >
                {house.name}
              </Link>
              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-1.5 py-5 text-center">
                  <NotebookPen
                    className="size-5 text-muted-foreground/20"
                    aria-hidden
                  />
                  <p className="text-xs text-muted-foreground/40">
                    {t("compare.noPoints")}
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-1.5 text-sm">
                  {items.map((body, index) => (
                    <li key={index} className="flex items-start gap-1.5 text-pretty">
                      <CircleSmall className="mt-0.5 size-3.5 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
                      {body}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function PointsComparison({
  houses,
  pointsByHouseId,
  notesByHouseId,
}: Props) {
  return (
    <div className="flex flex-col gap-10">
      <PointsSection
        side="pros"
        houses={houses}
        pointsByHouseId={pointsByHouseId}
      />
      <PointsSection
        side="cons"
        houses={houses}
        pointsByHouseId={pointsByHouseId}
      />
      <NotesSection houses={houses} notesByHouseId={notesByHouseId} />
    </div>
  );
}
