import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Quote, RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const QUOTES = [
  {
    text: "The body achieves what the mind believes.",
    author: "Napoleon Hill",
  },
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
  },
  {
    text: "An hour of exercise a day is just 4% of your day. No excuses.",
    author: "Unknown",
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
  },
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    author: "Arnold Schwarzenegger",
  },
  {
    text: "Your body can stand almost anything. It's your mind that you have to convince.",
    author: "Unknown",
  },
  {
    text: "Fitness is not about being better than someone else. It's about being better than you used to be.",
    author: "Khloe Kardashian",
  },
  { text: "Don't wish for it, work for it.", author: "Unknown" },
  { text: "You are one workout away from a good mood.", author: "Unknown" },
  {
    text: "Success is usually the culmination of controlling failure.",
    author: "Sylvester Stallone",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  { text: "Train insane or remain the same.", author: "Jillian Michaels" },
];

const TIPS = [
  {
    category: "Nutrition",
    tip: "Eat protein within 30 minutes after your workout to maximize muscle recovery and growth.",
  },
  {
    category: "Hydration",
    tip: "Drink at least 500ml of water before your workout and sip throughout to maintain peak performance.",
  },
  {
    category: "Sleep",
    tip: "Muscles grow during sleep, not during workouts. Aim for 7–9 hours of quality sleep every night.",
  },
  {
    category: "Consistency",
    tip: "Miss one day, miss two — the pattern is the enemy. A 10-minute workout beats skipping every time.",
  },
  {
    category: "Form",
    tip: "Proper form with light weight is always better than poor form with heavy weight. Injuries set you back months.",
  },
  {
    category: "Progression",
    tip: "Increase workout intensity by no more than 10% per week to avoid overuse injuries and plateaus.",
  },
  {
    category: "Recovery",
    tip: "Active recovery on rest days (light walk, yoga, stretching) keeps blood flowing and reduces soreness.",
  },
  {
    category: "Mindset",
    tip: "Compare yourself only to who you were yesterday — progress is personal and non-linear.",
  },
  {
    category: "Morning Routine",
    tip: "Morning workouts boost your metabolism for hours after exercise — burning more calories throughout the day.",
  },
  {
    category: "Strength",
    tip: "Compound movements (squats, push-ups, pull-ups) give you more results in less time than isolated exercises.",
  },
  {
    category: "Diet",
    tip: "Eat whole foods 80% of the time. The other 20% won't derail your progress — guilt derails progress more.",
  },
  {
    category: "Cardio",
    tip: "HIIT (High Intensity Interval Training) burns more fat in 20 minutes than steady-state cardio in 45 minutes.",
  },
  {
    category: "Flexibility",
    tip: "Stretch daily for 10 minutes. Flexibility reduces injury risk and improves overall athletic performance.",
  },
  {
    category: "Goals",
    tip: "Write down your fitness goals. People who write their goals are 42% more likely to achieve them.",
  },
  {
    category: "Breathing",
    tip: "Exhale on exertion (the hard part), inhale on the easy part. Proper breathing powers your workout.",
  },
  {
    category: "Warm-up",
    tip: "5–10 minutes of dynamic warm-up before every workout improves performance and prevents injuries.",
  },
  {
    category: "Posture",
    tip: "Engage your core during daily activities — sitting, walking, standing. Posture improvement is 24/7 training.",
  },
  {
    category: "Meal Timing",
    tip: "Eat a light meal 1–2 hours before training. Too full slows you down; empty stomach limits performance.",
  },
  {
    category: "Community",
    tip: "Working out with a partner or community increases consistency by up to 200%. Find your fitness tribe.",
  },
  {
    category: "Tracking",
    tip: "What gets measured gets improved. Track your workouts, weight, and nutrition to identify what's working.",
  },
];

const tipOfDayIndex = new Date().getDate() % TIPS.length;

const categoryColors: Record<string, string> = {
  Nutrition: "bg-primary/10 text-primary border-primary/30",
  Hydration: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  Sleep: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  Consistency: "bg-accent/10 text-accent border-accent/30",
  Form: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  Progression: "bg-primary/10 text-primary border-primary/30",
  Recovery: "bg-teal-500/10 text-teal-600 border-teal-500/30",
  Mindset: "bg-pink-500/10 text-pink-600 border-pink-500/30",
  "Morning Routine": "bg-accent/10 text-accent border-accent/30",
  Strength: "bg-red-500/10 text-red-600 border-red-500/30",
  Diet: "bg-primary/10 text-primary border-primary/30",
  Cardio: "bg-accent/10 text-accent border-accent/30",
  Flexibility: "bg-teal-500/10 text-teal-600 border-teal-500/30",
  Goals: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  Breathing: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  "Warm-up": "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  Posture: "bg-pink-500/10 text-pink-600 border-pink-500/30",
  "Meal Timing": "bg-primary/10 text-primary border-primary/30",
  Community: "bg-teal-500/10 text-teal-600 border-teal-500/30",
  Tracking: "bg-accent/10 text-accent border-accent/30",
};

export default function MotivationPage() {
  const [quoteIndex, setQuoteIndex] = useState(
    new Date().getDate() % QUOTES.length,
  );
  const [_flipping, setFlipping] = useState(false);

  const nextQuote = () => {
    setFlipping(true);
    setTimeout(() => {
      setQuoteIndex((i) => (i + 1) % QUOTES.length);
      setFlipping(false);
    }, 300);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl">Motivation</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Stay inspired and keep pushing
        </p>
      </div>

      {/* Quote of the Day */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #0d1f0f 50%, #1a0a00 100%)",
        }}
      >
        <Quote size={40} className="absolute top-4 left-4 text-white/10" />
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-display font-bold text-xl md:text-2xl text-white leading-tight mb-4">
              "{QUOTES[quoteIndex].text}"
            </p>
            <p className="text-green-400 text-sm font-medium">
              — {QUOTES[quoteIndex].author}
            </p>
          </motion.div>
        </AnimatePresence>
        <Button
          data-ocid="motivation.next_quote.button"
          variant="ghost"
          size="sm"
          onClick={nextQuote}
          className="mt-4 text-white/70 hover:text-white hover:bg-white/10 gap-1"
        >
          <RefreshCw size={14} /> New Quote
        </Button>
      </div>

      {/* Tip of the Day */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={18} className="text-accent" />
            <span className="font-display font-bold text-base">
              Tip of the Day
            </span>
            <Badge
              className={`ml-auto border text-xs ${categoryColors[TIPS[tipOfDayIndex].category] ?? ""}`}
              variant="outline"
            >
              {TIPS[tipOfDayIndex].category}
            </Badge>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {TIPS[tipOfDayIndex].tip}
          </p>
        </CardContent>
      </Card>

      {/* All Quotes */}
      <div>
        <h2 className="font-display font-bold text-lg mb-3">More Quotes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {QUOTES.map((q, qi) => (
            <motion.div
              key={q.text.slice(0, 20)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qi * 0.04 }}
            >
              <Card
                className={`hover:border-primary/30 transition-colors ${qi === quoteIndex ? "border-primary/50 bg-primary/5" : ""}`}
                data-ocid={`motivation.item.${qi + 1}`}
              >
                <CardContent className="p-4">
                  <p className="text-sm font-medium leading-relaxed mb-2">
                    "{q.text}"
                  </p>
                  <p className="text-xs text-muted-foreground">— {q.author}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Tips */}
      <div>
        <h2 className="font-display font-bold text-lg mb-3">Fitness Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TIPS.map((t, ti) => (
            <motion.div
              key={`${t.category}-${ti}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ti * 0.03 }}
            >
              <Card
                className="hover:border-primary/30 transition-colors"
                data-ocid={`motivation.tip.item.${ti + 1}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <Badge
                      className={`border text-xs shrink-0 ${categoryColors[t.category] ?? ""}`}
                      variant="outline"
                    >
                      {t.category}
                    </Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t.tip}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
