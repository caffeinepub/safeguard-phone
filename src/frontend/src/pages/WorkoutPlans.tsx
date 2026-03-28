import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, RotateCcw } from "lucide-react";

interface PlanExercise {
  name: string;
  reps: string;
  sets: number;
  rest: string;
  instructions: string;
}

interface Plan {
  exercises: PlanExercise[];
}

const PLANS: Record<string, Record<string, Plan>> = {
  beginner: {
    fatLoss: {
      exercises: [
        {
          name: "Jumping Jacks",
          reps: "30",
          sets: 3,
          rest: "30s",
          instructions:
            "Stand straight, jump while spreading legs and raising arms overhead. Land softly.",
        },
        {
          name: "Bodyweight Squats",
          reps: "15",
          sets: 3,
          rest: "45s",
          instructions:
            "Feet shoulder-width apart, lower until thighs parallel, keep chest up.",
        },
        {
          name: "Knee Push-ups",
          reps: "10",
          sets: 3,
          rest: "45s",
          instructions:
            "Knees on floor, hands wide, lower chest to ground, push back up.",
        },
        {
          name: "Brisk Walk",
          reps: "20 min",
          sets: 1,
          rest: "N/A",
          instructions:
            "Maintain a fast walking pace that raises heart rate slightly.",
        },
        {
          name: "Plank Hold",
          reps: "20s",
          sets: 3,
          rest: "30s",
          instructions:
            "Elbows under shoulders, body straight as a board. Squeeze core.",
        },
      ],
    },
    strength: {
      exercises: [
        {
          name: "Wall Push-ups",
          reps: "12",
          sets: 3,
          rest: "45s",
          instructions:
            "Stand facing wall, arms extended, bend elbows to bring chest to wall.",
        },
        {
          name: "Chair Squats",
          reps: "12",
          sets: 3,
          rest: "45s",
          instructions:
            "Lower yourself onto a chair slowly, then stand back up using legs only.",
        },
        {
          name: "Glute Bridges",
          reps: "15",
          sets: 3,
          rest: "30s",
          instructions:
            "Lie on back, feet flat, drive hips up squeezing glutes at top.",
        },
        {
          name: "Standing Rows",
          reps: "12",
          sets: 3,
          rest: "45s",
          instructions:
            "Use a resistance band or towel, pull toward chest keeping elbows high.",
        },
      ],
    },
    fullBody: {
      exercises: [
        {
          name: "Jumping Jacks",
          reps: "30",
          sets: 2,
          rest: "30s",
          instructions: "Full-body warm-up movement, keep pace moderate.",
        },
        {
          name: "Squats",
          reps: "15",
          sets: 3,
          rest: "45s",
          instructions:
            "Deep squat, keep heels down, push through them on the way up.",
        },
        {
          name: "Push-ups",
          reps: "10",
          sets: 3,
          rest: "45s",
          instructions:
            "Full push-up or on knees, keep body straight throughout.",
        },
        {
          name: "Lunges",
          reps: "10 each",
          sets: 2,
          rest: "30s",
          instructions:
            "Step forward, lower back knee toward floor, return and switch legs.",
        },
        {
          name: "Plank",
          reps: "30s",
          sets: 3,
          rest: "30s",
          instructions:
            "Maintain straight line from head to heels, breathe normally.",
        },
      ],
    },
  },
  intermediate: {
    fatLoss: {
      exercises: [
        {
          name: "Burpees",
          reps: "10",
          sets: 4,
          rest: "45s",
          instructions:
            "Drop to push-up, jump feet in, explode up with jump and clap overhead.",
        },
        {
          name: "Jump Squats",
          reps: "15",
          sets: 4,
          rest: "45s",
          instructions:
            "Squat down, explode upward jumping, land softly and repeat.",
        },
        {
          name: "Mountain Climbers",
          reps: "20 each",
          sets: 3,
          rest: "30s",
          instructions:
            "Plank position, drive knees to chest alternately at speed.",
        },
        {
          name: "Running Intervals",
          reps: "1 min fast / 1 min walk",
          sets: 8,
          rest: "Between sets",
          instructions:
            "Sprint for 1 minute, walk 1 minute to recover. Repeat 8 times.",
        },
        {
          name: "High Knees",
          reps: "30",
          sets: 3,
          rest: "30s",
          instructions:
            "Run in place driving knees to hip height, arms pumping.",
        },
      ],
    },
    strength: {
      exercises: [
        {
          name: "Push-ups",
          reps: "20",
          sets: 4,
          rest: "60s",
          instructions:
            "Full range of motion, chest nearly touching floor. Slow and controlled.",
        },
        {
          name: "Bulgarian Split Squat",
          reps: "10 each",
          sets: 3,
          rest: "60s",
          instructions:
            "Rear foot on bench, front foot forward. Lower hip toward floor.",
        },
        {
          name: "Dips",
          reps: "12",
          sets: 3,
          rest: "60s",
          instructions:
            "Use parallel bars or chairs. Lower until arms are 90°, push back up.",
        },
        {
          name: "Pike Push-ups",
          reps: "12",
          sets: 3,
          rest: "45s",
          instructions:
            "V-shape with body, lower head toward floor. Targets shoulders.",
        },
        {
          name: "Single-leg Deadlift",
          reps: "10 each",
          sets: 3,
          rest: "45s",
          instructions:
            "Hinge at hip with one leg, keep back flat, feel hamstring stretch.",
        },
      ],
    },
    fullBody: {
      exercises: [
        {
          name: "Jump Rope",
          reps: "3 min",
          sets: 3,
          rest: "1 min",
          instructions:
            "Basic two-foot jump, maintain rhythm, stay on balls of feet.",
        },
        {
          name: "Push-ups",
          reps: "20",
          sets: 3,
          rest: "45s",
          instructions: "Controlled descent, full lockout at top.",
        },
        {
          name: "Jump Squats",
          reps: "15",
          sets: 3,
          rest: "45s",
          instructions: "Explosive squat jumps with soft landing.",
        },
        {
          name: "Plank to Push-up",
          reps: "10",
          sets: 3,
          rest: "45s",
          instructions:
            "Start in forearm plank, push up to hands, lower back down.",
        },
        {
          name: "Reverse Lunges",
          reps: "12 each",
          sets: 3,
          rest: "30s",
          instructions: "Step backward, lower knee to floor, return forward.",
        },
      ],
    },
  },
  advanced: {
    fatLoss: {
      exercises: [
        {
          name: "Burpee Pull-ups",
          reps: "8",
          sets: 5,
          rest: "60s",
          instructions:
            "Add a pull-up at the top of each burpee for maximum intensity.",
        },
        {
          name: "Tabata Sprints",
          reps: "20s on/10s off",
          sets: 8,
          rest: "Between cycles",
          instructions:
            "Max effort sprint for 20 seconds, rest 10. Complete 8 rounds.",
        },
        {
          name: "Box Jumps",
          reps: "12",
          sets: 4,
          rest: "60s",
          instructions:
            "Explosive jump onto a box/platform, step down carefully.",
        },
        {
          name: "Battle Ropes",
          reps: "30s",
          sets: 5,
          rest: "45s",
          instructions:
            "Alternate arm waves with maximum intensity, engage core.",
        },
        {
          name: "Kettlebell Swings",
          reps: "20",
          sets: 4,
          rest: "45s",
          instructions:
            "Hip hinge drive, swing to shoulder height, control descent.",
        },
      ],
    },
    strength: {
      exercises: [
        {
          name: "Clap Push-ups",
          reps: "10",
          sets: 4,
          rest: "90s",
          instructions:
            "Explosive push-up with clap at top. Land with soft elbows.",
        },
        {
          name: "Pistol Squats",
          reps: "6 each",
          sets: 4,
          rest: "90s",
          instructions:
            "Single-leg squat to full depth. Use a wall for balance if needed.",
        },
        {
          name: "Handstand Push-ups",
          reps: "8",
          sets: 3,
          rest: "90s",
          instructions: "Kick up to wall, lower head to floor, press back up.",
        },
        {
          name: "Archer Push-ups",
          reps: "8 each",
          sets: 3,
          rest: "60s",
          instructions: "Wide push-up shifting weight to one arm at a time.",
        },
        {
          name: "L-sit Hold",
          reps: "20s",
          sets: 4,
          rest: "60s",
          instructions:
            "Support on parallel bars, lift legs parallel to floor.",
        },
      ],
    },
    fullBody: {
      exercises: [
        {
          name: "100-rep Challenge",
          reps: "100 total",
          sets: 1,
          rest: "As needed",
          instructions:
            "Choose push-ups, squats, burpees — complete 100 in as few sets as possible.",
        },
        {
          name: "Sprint Intervals",
          reps: "400m",
          sets: 5,
          rest: "2 min",
          instructions:
            "Run 400m at 90% effort. Rest 2 minutes. Repeat 5 times.",
        },
        {
          name: "Plyometric Lunges",
          reps: "12 each",
          sets: 4,
          rest: "60s",
          instructions:
            "Jump switch lunges, alternate legs with explosive power.",
        },
        {
          name: "Muscle-ups (bar)",
          reps: "5",
          sets: 3,
          rest: "2 min",
          instructions:
            "Pull-up explosively until hips reach bar, push up to dip position.",
        },
        {
          name: "Burpees",
          reps: "20",
          sets: 3,
          rest: "60s",
          instructions:
            "Full burpee with jump and clap. Maintain form throughout.",
        },
      ],
    },
  },
};

function ExerciseCard({ ex }: { ex: PlanExercise }) {
  return (
    <div className="p-4 border border-border rounded-lg hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-sm">{ex.name}</h4>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">
            {ex.sets} sets × {ex.reps}
          </Badge>
          <Badge variant="outline" className="text-xs flex items-center gap-1">
            <RotateCcw size={10} />
            {ex.rest}
          </Badge>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{ex.instructions}</p>
    </div>
  );
}

export default function WorkoutPlansPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl">Workout Plans</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Structured plans for every fitness level
        </p>
      </div>

      <Tabs defaultValue="beginner">
        <TabsList className="w-full mb-4" data-ocid="plans.level.tab">
          <TabsTrigger
            value="beginner"
            data-ocid="plans.beginner.tab"
            className="flex-1"
          >
            Beginner
          </TabsTrigger>
          <TabsTrigger
            value="intermediate"
            data-ocid="plans.intermediate.tab"
            className="flex-1"
          >
            Intermediate
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            data-ocid="plans.advanced.tab"
            className="flex-1"
          >
            Advanced
          </TabsTrigger>
        </TabsList>

        {(["beginner", "intermediate", "advanced"] as const).map((level) => (
          <TabsContent key={level} value={level}>
            <Tabs defaultValue="fatLoss">
              <TabsList
                className="w-full mb-4"
                data-ocid={`plans.${level}.goal.tab`}
              >
                <TabsTrigger value="fatLoss" className="flex-1 text-xs">
                  Fat Loss
                </TabsTrigger>
                <TabsTrigger value="strength" className="flex-1 text-xs">
                  Strength
                </TabsTrigger>
                <TabsTrigger value="fullBody" className="flex-1 text-xs">
                  Full Body
                </TabsTrigger>
              </TabsList>
              {(["fatLoss", "strength", "fullBody"] as const).map((goal) => (
                <TabsContent key={goal} value={goal}>
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={14} className="text-primary" />
                        <span className="text-xs text-muted-foreground">
                          {PLANS[level][goal].exercises.length} exercises • ~
                          {PLANS[level][goal].exercises.reduce(
                            (s, e) => s + e.sets,
                            0,
                          ) * 2}{" "}
                          minutes
                        </span>
                      </div>
                      {PLANS[level][goal].exercises.map((ex) => (
                        <ExerciseCard key={ex.name} ex={ex} />
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
