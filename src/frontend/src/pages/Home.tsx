import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Activity,
  Award,
  Calculator,
  Dumbbell,
  Flame,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const h = Number.parseFloat(height) / 100;
    const w = Number.parseFloat(weight);
    if (h > 0 && w > 0) setBmi(w / (h * h));
  };

  const getCategory = (b: number) => {
    if (b < 18.5) return { label: "Underweight", color: "text-blue-500" };
    if (b < 25) return { label: "Normal", color: "text-primary" };
    if (b < 30) return { label: "Overweight", color: "text-warning" };
    return { label: "Obese", color: "text-destructive" };
  };

  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calculator size={18} className="text-accent" />
          <h3 className="font-display font-semibold text-base">
            BMI Calculator
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">
              Height (cm)
            </Label>
            <Input
              data-ocid="bmi.height.input"
              type="number"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">
              Weight (kg)
            </Label>
            <Input
              data-ocid="bmi.weight.input"
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="h-9"
            />
          </div>
        </div>
        <Button
          data-ocid="bmi.submit_button"
          onClick={calculate}
          className="w-full h-9"
          size="sm"
        >
          Calculate BMI
        </Button>
        {bmi !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 text-center p-3 rounded-lg bg-muted/50"
          >
            <p className="text-3xl font-display font-bold">{bmi.toFixed(1)}</p>
            <p
              className={`text-sm font-semibold mt-1 ${getCategory(bmi).color}`}
            >
              {getCategory(bmi).label}
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const { setActiveTab, totalCaloriesToday, workoutsThisWeek } =
    useAppContext();

  const stats = [
    {
      icon: Dumbbell,
      label: "Workouts this week",
      value: workoutsThisWeek,
      color: "text-primary",
    },
    {
      icon: Flame,
      label: "Calories burned today",
      value: totalCaloriesToday > 0 ? totalCaloriesToday : 505,
      color: "text-accent",
    },
    {
      icon: Activity,
      label: "Active streak",
      value: "3 days",
      color: "text-primary",
    },
    {
      icon: Award,
      label: "Personal best",
      value: "Week 3",
      color: "text-accent",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #0d1f0f 50%, #1a0a00 100%)",
          minHeight: "420px",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('/assets/generated/fitness-hero.dim_1200x600.jpg')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, #0a0a0a 100%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/20">
              <Activity size={12} className="mr-1" /> Your Fitness Companion
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight"
          >
            Track Your{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #22c55e, #86efac)",
              }}
            >
              Fitness Journey
            </span>{" "}
            Every Day
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg mb-8 max-w-xl mx-auto"
          >
            Stay fit, lose weight, and follow guided workouts and diet plans.
            Built for everyone — beginners to athletes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Button
              data-ocid="home.start_workout.primary_button"
              size="lg"
              onClick={() => setActiveTab("tracker")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-green gap-2"
            >
              <Dumbbell size={18} /> Start Workout
            </Button>
            <Button
              data-ocid="home.track_progress.secondary_button"
              size="lg"
              variant="outline"
              onClick={() => setActiveTab("progress")}
              className="border-white/30 text-white hover:bg-white/10 gap-2"
            >
              <TrendingUp size={18} /> Track Progress
            </Button>
            <Button
              data-ocid="home.get_diet.secondary_button"
              size="lg"
              variant="outline"
              onClick={() => setActiveTab("diet")}
              className="border-accent/50 text-accent hover:bg-accent/10 gap-2"
            >
              <Flame size={18} /> Get Diet Plan
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card className="border-border">
                <CardContent className="p-4">
                  <stat.icon size={20} className={`${stat.color} mb-2`} />
                  <p className="font-display font-bold text-2xl">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BMI Calculator */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="max-w-md">
          <BMICalculator />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground py-6 border-t border-border">
        <p>
          © {new Date().getFullYear()} DailyFit Tracker. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
