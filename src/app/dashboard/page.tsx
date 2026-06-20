import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your houses</h1>
          <p className="text-sm text-muted-foreground">
            Add houses and score them against your criteria.
          </p>
        </div>
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base font-medium text-muted-foreground">
            No houses yet
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          House management arrives in Phase 4. For now, the foundation
          (auth, database, and scoring) is being set up.
        </CardContent>
      </Card>
    </main>
  );
}
