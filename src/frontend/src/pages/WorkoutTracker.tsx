import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock, Dumbbell, Flame } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { useActor } from "../hooks/useActor";
import { useLogWorkout } from "../hooks/useQueries";

interface Exercise {
  name: string;
  defaultReps: number;
  defaultSets: number;
  defaultDuration: number;
  caloriesPerMinute: number;
  unit: string;
}

const EXERCISES: Exercise[] = [
  {
    name: "Push-ups",
    defaultReps: 20,
    defaultSets: 3,
    defaultDuration: 10,
    caloriesPerMinute: 7,
    unit: "reps",
  },
  {
    name: "Squats",
    defaultReps: 25,
    defaultSets: 3,
    defaultDuration: 12,
    caloriesPerMinute: 8,
    unit: "reps",
  },
  {
    name: "Running",
    defaultReps: 1,
    defaultSets: 1,
    defaultDuration: 30,
    caloriesPerMinute: 10,
    unit: "mins",
  },
  {
    name: "Jumping Jacks",
    defaultReps: 50,
    defaultSets: 3,
    defaultDuration: 10,
    caloriesPerMinute: 9,
    unit: "reps",
  },
  {
    name: "Plank",
    defaultReps: 1,
    defaultSets: 4,
    defaultDuration: 8,
    caloriesPerMinute: 5,
    unit: "sets",
  },
  {
    name: "Boxing Training",
    defaultReps: 30,
    defaultSets: 3,
    defaultDuration: 20,
    caloriesPerMinute: 12,
    unit: "reps",
  },
  {
    name: "Yoga",
    defaultReps: 1,
    defaultSets: 1,
    defaultDuration: 30,
    caloriesPerMinute: 4,
    unit: "session",
  },
  {
    name: "Stretching",
    defaultReps: 1,
    defaultSets: 1,
    defaultDuration: 15,
    caloriesPerMinute: 3,
    unit: "session",
  },
];

function getWeeklyData(workouts: { timestamp: Date; exerciseName: string }[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const counts = new Array(7).fill(0);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  for (const w of workouts) {
    if (w.timestamp >= startOfWeek) {
      const day = w.timestamp.getDay();
      counts[day]++;
    }
  }
  return days.map((d, i) => ({ day: d, workouts: counts[i] }));
}

export default function WorkoutTrackerPage() {
  const { localWorkouts, addLocalWorkout } = useAppContext();
  const { actor } = useActor();
  const logWorkoutMutation = useLogWorkout();

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [reps, setReps] = useState<Record<string, string>>({});
  const [sets, setSets] = useState<Record<string, string>>({});
  const [duration, setDuration] = useState<Record<string, string>>({});
  const [logging, setLogging] = useState(false);

  const toggleCheck = (name: string) =>
    setChecked((prev) => ({ ...prev, [name]: !prev[name] }));

  const getVal = (record: Record<string, string>, name: string, def: number) =>
    Number.parseFloat(record[name] ?? "") || def;

  const handleLog = async () => {
    const selected = EXERCISES.filter((e) => checked[e.name]);
    if (selected.length === 0) {
      toast.error("Select at least one exercise");
      return;
    }
    setLogging(true);
    try {
      for (const ex of selected) {
        const r = getVal(reps, ex.name, ex.defaultReps);
        const s = getVal(sets, ex.name, ex.defaultSets);
        const d = getVal(duration, ex.name, ex.defaultDuration);
        const cal = Math.round(d * ex.caloriesPerMinute);
        addLocalWorkout({
          exerciseName: ex.name,
          reps: r,
          sets: s,
          durationMinutes: d,
          caloriesBurned: cal,
        });
        if (actor) {
          await logWorkoutMutation.mutateAsync({
            exerciseName: ex.name,
            reps: r,
            sets: s,
            durationMinutes: d,
            caloriesBurned: cal,
          });
        }
      }
      toast.success(
        `Logged ${selected.length} exercise${selected.length > 1 ? "s" : ""} successfully!`,
      );
      setChecked({});
    } catch {
      toast.error("Failed to log workout");
    } finally {
      setLogging(false);
    }
  };

  const weeklyData = getWeeklyData(localWorkouts);
  const todayWorkouts = localWorkouts.filter((w) => {
    const today = new Date();
    return w.timestamp.toDateString() === today.toDateString();
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl">Workout Tracker</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Log today's exercises and track your progress
        </p>
      </div>

      {/* Exercise Checklist */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Dumbbell size={16} className="text-primary" /> Today's Exercises
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {EXERCISES.map((ex, i) => (
            <motion.div
              key={ex.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              data-ocid={`workout.item.${i + 1}`}
              className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border transition-colors ${
                checked[ex.name]
                  ? "border-primary/40 bg-primary/5"
                  : "border-border"
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Checkbox
                  data-ocid={`workout.checkbox.${i + 1}`}
                  id={`ex-${ex.name}`}
                  checked={!!checked[ex.name]}
                  onCheckedChange={() => toggleCheck(ex.name)}
                  className="border-primary data-[state=checked]:bg-primary"
                />
                <label
                  htmlFor={`ex-${ex.name}`}
                  className="font-medium text-sm cursor-pointer"
                >
                  {ex.name}
                </label>
                <Badge variant="outline" className="text-xs ml-auto sm:ml-0">
                  <Flame size={10} className="mr-1 text-accent" />
                  {Math.round(ex.defaultDuration * ex.caloriesPerMinute)} kcal
                </Badge>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground w-8">
                    {ex.unit}
                  </span>
                  <Input
                    data-ocid={"workout.reps.input"}
                    type="number"
                    className="h-7 w-16 text-xs"
                    placeholder={String(ex.defaultReps)}
                    value={reps[ex.name] ?? ""}
                    onChange={(e) =>
                      setReps((p) => ({ ...p, [ex.name]: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground w-5">
                    sets
                  </span>
                  <Input
                    data-ocid={"workout.sets.input"}
                    type="number"
                    className="h-7 w-14 text-xs"
                    placeholder={String(ex.defaultSets)}
                    value={sets[ex.name] ?? ""}
                    onChange={(e) =>
                      setSets((p) => ({ ...p, [ex.name]: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} className="text-muted-foreground" />
                  <Input
                    data-ocid={"workout.duration.input"}
                    type="number"
                    className="h-7 w-14 text-xs"
                    placeholder={String(ex.defaultDuration)}
                    value={duration[ex.name] ?? ""}
                    onChange={(e) =>
                      setDuration((p) => ({ ...p, [ex.name]: e.target.value }))
                    }
                  />
                </div>
              </div>
            </motion.div>
          ))}
          <Button
            data-ocid="workout.submit_button"
            onClick={handleLog}
            disabled={logging || Object.values(checked).every((v) => !v)}
            className="w-full mt-4 gap-2"
          >
            <CheckCircle size={16} />
            {logging ? "Logging..." : "Log Workout"}
          </Button>
        </CardContent>
      </Card>

      {/* Weekly Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={weeklyData}
              margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.9 0.01 220)"
              />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar
                dataKey="workouts"
                fill="oklch(0.72 0.19 145)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Today's Log */}
      {todayWorkouts.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Today's Log</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {todayWorkouts.map((w, i) => (
              <div
                key={w.id}
                data-ocid={`workout.log.item.${i + 1}`}
                className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/50"
              >
                <span className="font-medium">{w.exerciseName}</span>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span>
                    {w.sets}×{w.reps} {w.durationMinutes}min
                  </span>
                  <Badge variant="outline" className="text-xs">
                    <Flame size={10} className="mr-1 text-accent" />
                    {w.caloriesBurned} kcal
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
