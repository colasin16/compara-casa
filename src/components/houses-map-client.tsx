"use client";

import dynamic from "next/dynamic";
import type { HouseWithScore } from "@/lib/queries";

const HousesMap = dynamic(
  () => import("@/components/houses-map").then((m) => m.HousesMap),
  { ssr: false },
);

type Props = {
  houses: HouseWithScore[];
};

export function HousesMapClient({ houses }: Props) {
  return <HousesMap houses={houses} />;
}
