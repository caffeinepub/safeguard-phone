import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Droplets, Dumbbell, TrendingUp, Weight } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { useActor } from "../hooks/useActor";
import { useLogWater, useLogWeight } from "../hooks/useQueries";

const WATER_GOAL = 2000;

export default function ProgressTrackerPage() {
  const {
    localWeights,
    addLocalWeight,
    localWater,
    addLocalWater,
    localWorkouts,
    workoutsThisWeek,
  } = useAppContext();
  const { actor } = useActor();
  const logWeightMutation = useLogWeight();
  const logWaterMutation = useLogWater();

  const [weightInput, setWeightInput] = useState("");
  const [waterInput, setWaterInput] = useState("");

  const handleLogWeight = async () => {
    const w = Number.parseFloat(weightInput);
    if (!w || w < 20 || w > 300) {
      toast.error("Enter a valid weight (20–300 kg)");
      return;
    }
    addLocalWeight(w);
    if (actor) await logWeightMutation.mutateAsync(w).catch(() => {});
    toast.success(`Weight ${w} kg logged!`);
    setWeightInput("");
  };

  const handleLogWater = async (amount: number) => {
    addLocalWater(amount);
    if (actor) await logWaterMutation.mutateAsync(amount).catch(() => {});
    toast.success(`${amount}ml water logged!`);
    setWaterInput("");
  };

  const today = new Date();
  const todayWater = localWater
    .filter(
      (w) => new Date(w.timestamp).toDateString() === today.toDateString(),
    )
    .reduce((s, w) => s + w.amountMl, 0);

  const waterPct = Math.min((todayWater / WATER_GOAL) * 100, 100);

  const weightChartData = localWeights.slice(-14).map((w) => ({
    date: new Date(w.timestamp).toLocaleDateString("en", {
      month: "short",
      day: "numeric",
    }),
    weight: w.weight,
  }));

  // Weekly workouts by day
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const weeklyCompletion = days.map((day, i) => {
    const count = localWorkouts.filter((w) => {
      const d = new Date(w.timestamp);
      return d.getDay() === i && d >= startOfWeek;
    }).length;
    return { day, done: count > 0, count };
  });
  const completedDays = weeklyCompletion.filter((d) => d.done).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl">Progress Tracker</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Monitor your fitness journey
        </p>
      </div>

      {/* Weight Log */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Weight size={16} className="text-primary" /> Weight Log
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground mb-1 block">
                Today's weight (kg)
              </Label>
              <Input
                data-ocid="progress.weight.input"
                type="number"
                step="0.1"
                placeholder="e.g. 72.5"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogWeight()}
              />
            </div>
            <Button
              data-ocid="progress.weight.submit_button"
              onClick={handleLogWeight}
              className="mt-5"
            >
              Log
            </Button>
          </div>
          {weightChartData.length >= 2 && (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart
                data={weightChartData}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.9 0.01 220)"
                />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="oklch(0.72 0.19 145)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          {localWeights.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Latest:{" "}
              <span className="font-semibold text-foreground">
                {localWeights[localWeights.length - 1].weight} kg
              </span>
              {localWeights.length >= 2 && (
                <span
                  className={`ml-2 ${localWeights[localWeights.length - 1].weight < localWeights[localWeights.length - 2].weight ? "text-primary" : "text-destructive"}`}
                >
                  {localWeights[localWeights.length - 1].weight <
                  localWeights[localWeights.length - 2].weight
                    ? "↓"
                    : "↑"}
                  {Math.abs(
                    localWeights[localWeights.length - 1].weight -
                      localWeights[localWeights.length - 2].weight,
                  ).toFixed(1)}{" "}
                  kg
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Water Intake */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Droplets size={16} className="text-blue-500" /> Water Intake
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Today's intake</span>
            <span className="font-semibold">
              {todayWater} / {WATER_GOAL} ml
            </span>
          </div>
          <div className="relative">
            <Progress
              value={waterPct}
              className="h-4"
              data-ocid="progress.water.loading_state"
            />
            <span className="absolute right-2 top-0 h-4 flex items-center text-xs font-bold text-white">
              {Math.round(waterPct)}%
            </span>
          </div>
          {waterPct >= 100 && (
            <Badge className="bg-primary/10 text-primary border-primary/30">
              🎉 Daily goal reached!
            </Badge>
          )}
          <div className="flex gap-2 flex-wrap">
            {[250, 500, 750].map((ml) => (
              <Button
                key={ml}
                data-ocid={`progress.water.${ml === 250 ? "primary_button" : ml === 500 ? "secondary_button" : "toggle"}`}
                variant="outline"
                size="sm"
                onClick={() => handleLogWater(ml)}
                className="gap-1"
              >
                <Droplets size={12} />
                {ml}ml
              </Button>
            ))}
            <div className="flex gap-2">
              <Input
                data-ocid="progress.water.input"
                type="number"
                placeholder="Custom ml"
                value={waterInput}
                onChange={(e) => setWaterInput(e.target.value)}
                className="h-8 w-28 text-sm"
              />
              <Button
                data-ocid="progress.water.submit_button"
                size="sm"
                className="h-8"
                onClick={() => handleLogWater(Number.parseInt(waterInput) || 0)}
                disabled={!waterInput}
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Workout Completion */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Dumbbell size={16} className="text-accent" /> Weekly Workout Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Active days this week</span>
            <span className="font-semibold">{completedDays} / 7</span>
          </div>
          <Progress value={(completedDays / 7) * 100} className="h-3" />
          <div className="flex gap-2 flex-wrap">
            {weeklyCompletion.map((d) => (
              <div
                key={d.day}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border ${
                  d.done
                    ? "border-primary/40 bg-primary/10"
                    : "border-border bg-muted/30"
                }`}
              >
                <span className="text-xs font-semibold">{d.day}</span>
                <span
                  className={`text-lg ${d.done ? "" : "grayscale opacity-40"}`}
                >
                  {d.done ? "💪" : "○"}
                </span>
                {d.count > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {d.count}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-primary" />
            <span className="text-sm">
              <span className="font-semibold text-primary">
                {workoutsThisWeek}
              </span>{" "}
              workouts logged this week
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
