import Link from "next/link";
import { HouseForm } from "@/components/house-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getHousesWithScores } from "@/lib/queries";
import { formatScore } from "@/lib/scoring";

export default async function DashboardPage() {
  const houses = await getHousesWithScores();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Your houses</h1>
        <p className="text-sm text-muted-foreground">
          Ranked by their weighted score. Open a house to rate it against your
          criteria.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_320px] md:items-start">
        <div className="flex flex-col gap-3">
          {houses.length === 0 ? (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base font-medium text-muted-foreground">
                  No houses yet
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Add your first house using the form, then open it to score each
                criterion. Make sure you&apos;ve set up your{" "}
                <Link href="/criteria" className="underline">
                  criteria
                </Link>{" "}
                first.
              </CardContent>
            </Card>
          ) : (
            houses.map((house, index) => (
              <Link
                key={house.id}
                href={`/houses/${house.id}`}
                className="group"
              >
                <Card className="transition-colors group-hover:border-primary/50">
                  <CardContent className="flex items-center gap-4 py-4">
                    <span className="w-6 text-center text-sm font-medium text-muted-foreground tabular-nums">
                      {index + 1}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-medium">{house.name}</span>
                      {house.address ? (
                        <span className="truncate text-xs text-muted-foreground">
                          {house.address}
                        </span>
                      ) : null}
                      <span className="text-xs text-muted-foreground">
                        {house.rated} of {house.totalCriteria} criteria rated
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-bold tabular-nums">
                        {formatScore(house.finalScore)}
                      </span>
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        score
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        <Card className="md:sticky md:top-20">
          <CardHeader>
            <CardTitle className="text-base">Add a house</CardTitle>
          </CardHeader>
          <CardContent>
            <HouseForm mode="create" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
