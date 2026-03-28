import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Moon, Sun, Utensils } from "lucide-react";

interface Meal {
  time: string;
  icon: React.ReactNode;
  label: string;
  items: { name: string; desc: string }[];
}

const PLANS: Record<string, Record<string, Meal[]>> = {
  weightLoss: {
    vegetarian: [
      {
        time: "7:00 AM",
        icon: <Coffee size={14} />,
        label: "Breakfast",
        items: [
          {
            name: "Oats porridge",
            desc: "½ cup rolled oats with almond milk, chia seeds & berries",
          },
          { name: "Green tea", desc: "Unsweetened, boosts metabolism" },
          { name: "1 banana", desc: "Natural energy boost, potassium-rich" },
        ],
      },
      {
        time: "1:00 PM",
        icon: <Sun size={14} />,
        label: "Lunch",
        items: [
          { name: "Brown rice", desc: "½ cup with mixed dal (lentil curry)" },
          {
            name: "Palak paneer",
            desc: "Spinach & cottage cheese — iron & protein rich",
          },
          {
            name: "Cucumber salad",
            desc: "With lemon dressing, fills you up with few calories",
          },
        ],
      },
      {
        time: "4:00 PM",
        icon: <Utensils size={14} />,
        label: "Snack",
        items: [
          {
            name: "Handful of almonds",
            desc: "~10 almonds, healthy fats & protein",
          },
          { name: "Apple or pear", desc: "High fiber, low calorie" },
        ],
      },
      {
        time: "7:30 PM",
        icon: <Moon size={14} />,
        label: "Dinner",
        items: [
          {
            name: "Vegetable soup",
            desc: "Tomato-based with seasonal vegetables",
          },
          {
            name: "2 whole wheat rotis",
            desc: "Low GI, keeps you full longer",
          },
          { name: "Moong dal", desc: "Light, high-protein lentil dish" },
        ],
      },
    ],
    nonVegetarian: [
      {
        time: "7:00 AM",
        icon: <Coffee size={14} />,
        label: "Breakfast",
        items: [
          {
            name: "3 egg whites + 1 yolk scrambled",
            desc: "High protein, low fat breakfast",
          },
          {
            name: "2 whole wheat toast",
            desc: "Complex carbs for sustained energy",
          },
          { name: "Orange juice", desc: "Fresh squeezed, vitamin C" },
        ],
      },
      {
        time: "1:00 PM",
        icon: <Sun size={14} />,
        label: "Lunch",
        items: [
          {
            name: "Grilled chicken breast",
            desc: "150g, marinated with herbs — lean protein",
          },
          { name: "Brown rice", desc: "½ cup, complex carbohydrate" },
          {
            name: "Steamed broccoli",
            desc: "With lemon, packed with vitamins",
          },
        ],
      },
      {
        time: "4:00 PM",
        icon: <Utensils size={14} />,
        label: "Snack",
        items: [
          { name: "Greek yogurt", desc: "100g plain, high protein" },
          { name: "Mixed nuts", desc: "Small handful, ~15g" },
        ],
      },
      {
        time: "7:30 PM",
        icon: <Moon size={14} />,
        label: "Dinner",
        items: [
          {
            name: "Grilled fish",
            desc: "Salmon or tilapia 120g, omega-3 rich",
          },
          {
            name: "Vegetable stir fry",
            desc: "Mixed vegetables in minimal oil",
          },
          { name: "Clear chicken soup", desc: "Protein rich, low calorie" },
        ],
      },
    ],
  },
  stayFit: {
    vegetarian: [
      {
        time: "7:00 AM",
        icon: <Coffee size={14} />,
        label: "Breakfast",
        items: [
          {
            name: "Vegetable upma",
            desc: "Semolina with vegetables, balanced breakfast",
          },
          {
            name: "Banana smoothie",
            desc: "Banana + milk + honey, energy boost",
          },
          {
            name: "2 boiled eggs or paneer",
            desc: "Protein source (substitute if needed)",
          },
        ],
      },
      {
        time: "1:00 PM",
        icon: <Sun size={14} />,
        label: "Lunch",
        items: [
          {
            name: "Rajma chawal",
            desc: "Kidney beans + rice, complete protein",
          },
          {
            name: "Mixed vegetable curry",
            desc: "Seasonal vegetables in light gravy",
          },
          { name: "Lassi", desc: "Yogurt-based drink, probiotics" },
        ],
      },
      {
        time: "4:00 PM",
        icon: <Utensils size={14} />,
        label: "Snack",
        items: [
          {
            name: "Fruit bowl",
            desc: "Mango, papaya, pineapple — vitamins and enzymes",
          },
          { name: "Roasted chana", desc: "High protein, high fiber snack" },
        ],
      },
      {
        time: "7:30 PM",
        icon: <Moon size={14} />,
        label: "Dinner",
        items: [
          {
            name: "Paneer tikka",
            desc: "Grilled cottage cheese, protein-rich",
          },
          { name: "2 rotis", desc: "Whole wheat" },
          {
            name: "Green salad",
            desc: "Cucumber, tomato, onion with olive oil dressing",
          },
        ],
      },
    ],
    nonVegetarian: [
      {
        time: "7:00 AM",
        icon: <Coffee size={14} />,
        label: "Breakfast",
        items: [
          {
            name: "Chicken omelette",
            desc: "2 eggs + chicken strips + vegetables",
          },
          { name: "Multigrain toast", desc: "2 slices with avocado" },
          {
            name: "Black coffee or green tea",
            desc: "Antioxidants, metabolism boost",
          },
        ],
      },
      {
        time: "1:00 PM",
        icon: <Sun size={14} />,
        label: "Lunch",
        items: [
          {
            name: "Chicken biryani",
            desc: "Moderate portion, rice + chicken + spices",
          },
          { name: "Raita", desc: "Yogurt with cucumber, aids digestion" },
          { name: "Mixed salad", desc: "Fresh greens, tomatoes, carrots" },
        ],
      },
      {
        time: "4:00 PM",
        icon: <Utensils size={14} />,
        label: "Snack",
        items: [
          { name: "Tuna on crackers", desc: "Lean protein + complex carbs" },
          { name: "Fruit juice", desc: "Fresh pressed, no added sugar" },
        ],
      },
      {
        time: "7:30 PM",
        icon: <Moon size={14} />,
        label: "Dinner",
        items: [
          { name: "Grilled chicken", desc: "150g with herbs and lemon" },
          { name: "Sweet potato", desc: "Baked, complex carbs for recovery" },
          { name: "Steamed vegetables", desc: "Broccoli, carrot, green beans" },
        ],
      },
    ],
  },
};

function MealCard({ meal }: { meal: Meal }) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <span className="text-primary">{meal.icon}</span>
          {meal.label}
          <span className="text-xs text-muted-foreground font-normal ml-auto">
            {meal.time}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2">
        {meal.items.map((item) => (
          <div key={item.name} className="flex gap-2">
            <span className="text-primary text-xs mt-0.5">▸</span>
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function DietPlansPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl">Diet Plans</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Healthy daily meal plans for your fitness goals
        </p>
      </div>

      <Tabs defaultValue="weightLoss">
        <TabsList className="w-full mb-4" data-ocid="diet.goal.tab">
          <TabsTrigger
            value="weightLoss"
            data-ocid="diet.weightloss.tab"
            className="flex-1"
          >
            Weight Loss
          </TabsTrigger>
          <TabsTrigger
            value="stayFit"
            data-ocid="diet.stayfit.tab"
            className="flex-1"
          >
            Stay Fit
          </TabsTrigger>
        </TabsList>

        {(["weightLoss", "stayFit"] as const).map((goal) => (
          <TabsContent key={goal} value={goal}>
            <Tabs defaultValue="vegetarian">
              <TabsList className="w-full mb-4">
                <TabsTrigger
                  value="vegetarian"
                  data-ocid={`diet.${goal}.veg.tab`}
                  className="flex-1"
                >
                  🥗 Vegetarian
                </TabsTrigger>
                <TabsTrigger
                  value="nonVegetarian"
                  data-ocid={`diet.${goal}.nonveg.tab`}
                  className="flex-1"
                >
                  🍗 Non-Vegetarian
                </TabsTrigger>
              </TabsList>
              {(["vegetarian", "nonVegetarian"] as const).map((diet) => (
                <TabsContent key={diet} value={diet}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/10">
                        Daily Meal Plan
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {goal === "weightLoss"
                          ? "~1400–1600 kcal"
                          : "~2000–2200 kcal"}
                      </span>
                    </div>
                    {PLANS[goal][diet].map((meal) => (
                      <MealCard key={meal.label} meal={meal} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
