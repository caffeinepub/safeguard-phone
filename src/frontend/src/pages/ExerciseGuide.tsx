import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { motion } from "motion/react";

const EXERCISES = [
  {
    name: "Push-ups",
    description:
      "A classic upper body exercise that builds strength in your chest, shoulders, and triceps using just your bodyweight.",
    muscles: ["Chest", "Triceps", "Shoulders", "Core"],
    difficulty: "Beginner",
    icon: "💪",
    steps: [
      "Start in a high plank position with hands slightly wider than shoulder-width",
      "Keep your body in a straight line from head to heels — engage your core",
      "Lower your chest to the floor by bending elbows at 45° angle",
      "Push back up to full arm extension without flaring elbows out",
      "Breathe in on the way down, breathe out on the push up",
    ],
  },
  {
    name: "Squats",
    description:
      "The king of lower body exercises. Squats target your quads, hamstrings, glutes, and build overall functional strength.",
    muscles: ["Quadriceps", "Hamstrings", "Glutes", "Core"],
    difficulty: "Beginner",
    icon: "🦵",
    steps: [
      "Stand with feet shoulder-width apart, toes pointed slightly outward",
      "Keep chest tall and arms extended forward for balance",
      "Push hips back and bend knees, lowering until thighs are parallel to floor",
      "Keep heels firmly planted throughout the movement",
      "Drive through heels to return to starting position, squeezing glutes at top",
    ],
  },
  {
    name: "Lunges",
    description:
      "Unilateral leg training that improves balance, coordination, and builds equal leg strength.",
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Calves"],
    difficulty: "Beginner",
    icon: "🏃",
    steps: [
      "Stand tall with feet together and hands on hips",
      "Take a large step forward with your right foot",
      "Lower your back knee toward the ground, keeping front shin vertical",
      "Both knees should form approximately 90° angles at the bottom",
      "Push through your front heel to return to start, then alternate legs",
    ],
  },
  {
    name: "Plank",
    description:
      "The ultimate isometric core exercise that builds deep stabilizer muscles and improves posture.",
    muscles: ["Core", "Shoulders", "Glutes", "Back"],
    difficulty: "Beginner",
    icon: "🧘",
    steps: [
      "Start in a forearm position with elbows directly under shoulders",
      "Keep your body in a perfectly straight line — no sagging hips or raised buttocks",
      "Engage your abs, glutes, and quads throughout the hold",
      "Keep your neck neutral, eyes looking down slightly",
      "Breathe steadily and focus on form, not just time",
    ],
  },
  {
    name: "Running",
    description:
      "The most natural cardio exercise. Running burns calories, strengthens the heart, and improves mental health.",
    muscles: ["Calves", "Quadriceps", "Hamstrings", "Glutes", "Core"],
    difficulty: "All Levels",
    icon: "🏃‍♂️",
    steps: [
      "Maintain an upright posture with slight forward lean from the ankles",
      "Land with a midfoot strike, not a heavy heel strike",
      "Keep arms bent at 90° and swing them forward — not across your body",
      "Breathe rhythmically: try inhaling for 2 steps, exhaling for 2 steps",
      "Start slow and build pace gradually, especially for beginners",
    ],
  },
  {
    name: "Jumping Jacks",
    description:
      "A full-body cardio exercise that gets your heart pumping and warms up multiple muscle groups simultaneously.",
    muscles: ["Calves", "Hip Flexors", "Deltoids", "Core"],
    difficulty: "Beginner",
    icon: "⭐",
    steps: [
      "Stand with feet together and arms at your sides",
      "Jump and simultaneously spread your feet wider than shoulder-width",
      "Raise your arms overhead, nearly meeting at the top",
      "Jump back to starting position bringing feet together and arms down",
      "Land softly with slightly bent knees to reduce joint impact",
    ],
  },
  {
    name: "Stretching",
    description:
      "Essential for recovery, injury prevention, and flexibility. Always stretch after workouts when muscles are warm.",
    muscles: ["Full Body", "Flexibility", "Joints"],
    difficulty: "Beginner",
    icon: "🤸",
    steps: [
      "Always stretch after a workout, never cold — warm muscles stretch safely",
      "Hold each stretch for 20-30 seconds without bouncing",
      "Stretch to the point of mild discomfort, not pain",
      "Focus on major muscle groups: quads, hamstrings, hip flexors, chest, shoulders",
      "Breathe deeply and relax into each stretch progressively",
    ],
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: "border-primary/40 text-primary bg-primary/10",
  Intermediate: "border-accent/40 text-accent bg-accent/10",
  Advanced: "border-destructive/40 text-destructive bg-destructive/10",
  "All Levels": "border-muted-foreground/40 text-muted-foreground bg-muted",
};

export default function ExerciseGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl">Exercise Guide</h1>
        <p className="text-muted-foreground text-sm mt-1">
          How to perform exercises safely and effectively
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXERCISES.map((ex, i) => (
          <motion.div
            key={ex.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card
              className="h-full hover:border-primary/30 transition-colors"
              data-ocid={`guide.item.${i + 1}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{ex.icon}</span>
                    <h3 className="font-display font-bold text-lg">
                      {ex.name}
                    </h3>
                  </div>
                  <Badge
                    className={`text-xs border ${difficultyColor[ex.difficulty] ?? ""}`}
                    variant="outline"
                  >
                    {ex.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {ex.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {ex.muscles.map((m) => (
                    <Badge key={m} variant="secondary" className="text-xs">
                      {m}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <Activity size={12} className="text-primary" /> How to
                    perform:
                  </p>
                  {ex.steps.map((step, si) => (
                    <p
                      key={step.slice(0, 20)}
                      className="text-xs text-muted-foreground flex gap-2"
                    >
                      <span className="text-primary font-bold shrink-0">
                        {si + 1}.
                      </span>
                      {step}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
