import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export interface LocalWorkout {
  id: number;
  exerciseName: string;
  reps: number;
  sets: number;
  durationMinutes: number;
  caloriesBurned: number;
  timestamp: Date;
}

export interface LocalWeight {
  id: number;
  weight: number;
  timestamp: Date;
}

export interface LocalWater {
  id: number;
  amountMl: number;
  timestamp: Date;
}

interface AppContextType {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  localWorkouts: LocalWorkout[];
  addLocalWorkout: (w: Omit<LocalWorkout, "id" | "timestamp">) => void;
  localWeights: LocalWeight[];
  addLocalWeight: (weight: number) => void;
  localWater: LocalWater[];
  addLocalWater: (amountMl: number) => void;
  totalCaloriesToday: number;
  workoutsThisWeek: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SEED_WORKOUTS: LocalWorkout[] = [
  {
    id: 1,
    exerciseName: "Push-ups",
    reps: 20,
    sets: 3,
    durationMinutes: 10,
    caloriesBurned: 80,
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: 2,
    exerciseName: "Squats",
    reps: 25,
    sets: 3,
    durationMinutes: 12,
    caloriesBurned: 100,
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: 3,
    exerciseName: "Running",
    reps: 1,
    sets: 1,
    durationMinutes: 30,
    caloriesBurned: 280,
    timestamp: new Date(Date.now() - 172800000),
  },
  {
    id: 4,
    exerciseName: "Plank",
    reps: 1,
    sets: 4,
    durationMinutes: 8,
    caloriesBurned: 45,
    timestamp: new Date(Date.now() - 259200000),
  },
  {
    id: 5,
    exerciseName: "Jumping Jacks",
    reps: 50,
    sets: 3,
    durationMinutes: 10,
    caloriesBurned: 120,
    timestamp: new Date(Date.now() - 345600000),
  },
];

const SEED_WEIGHTS: LocalWeight[] = [
  { id: 1, weight: 78, timestamp: new Date(Date.now() - 2592000000) },
  { id: 2, weight: 77.5, timestamp: new Date(Date.now() - 1728000000) },
  { id: 3, weight: 77, timestamp: new Date(Date.now() - 864000000) },
  { id: 4, weight: 76.5, timestamp: new Date(Date.now() - 432000000) },
  { id: 5, weight: 76.2, timestamp: new Date(Date.now() - 86400000) },
];

const SEED_WATER: LocalWater[] = [
  { id: 1, amountMl: 500, timestamp: new Date(Date.now() - 21600000) },
  { id: 2, amountMl: 250, timestamp: new Date(Date.now() - 14400000) },
  { id: 3, amountMl: 500, timestamp: new Date(Date.now() - 7200000) },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkModeState] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [localWorkouts, setLocalWorkouts] =
    useState<LocalWorkout[]>(SEED_WORKOUTS);
  const [localWeights, setLocalWeights] = useState<LocalWeight[]>(SEED_WEIGHTS);
  const [localWater, setLocalWater] = useState<LocalWater[]>(SEED_WATER);
  const [nextId, setNextId] = useState(100);

  const setDarkMode = useCallback((v: boolean) => {
    setDarkModeState(v);
    if (v) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const addLocalWorkout = useCallback(
    (w: Omit<LocalWorkout, "id" | "timestamp">) => {
      setLocalWorkouts((prev) => [
        { ...w, id: nextId, timestamp: new Date() },
        ...prev,
      ]);
      setNextId((n) => n + 1);
    },
    [nextId],
  );

  const addLocalWeight = useCallback(
    (weight: number) => {
      setLocalWeights((prev) => [
        ...prev,
        { id: nextId, weight, timestamp: new Date() },
      ]);
      setNextId((n) => n + 1);
    },
    [nextId],
  );

  const addLocalWater = useCallback(
    (amountMl: number) => {
      setLocalWater((prev) => [
        ...prev,
        { id: nextId, amountMl, timestamp: new Date() },
      ]);
      setNextId((n) => n + 1);
    },
    [nextId],
  );

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());

  const totalCaloriesToday = localWorkouts
    .filter((w) => w.timestamp >= startOfDay)
    .reduce((sum, w) => sum + w.caloriesBurned, 0);

  const workoutsThisWeek = localWorkouts.filter(
    (w) => w.timestamp >= startOfWeek,
  ).length;

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        activeTab,
        setActiveTab,
        localWorkouts,
        addLocalWorkout,
        localWeights,
        addLocalWeight,
        localWater,
        addLocalWater,
        totalCaloriesToday,
        workoutsThisWeek,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
