import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { WaterIntakeEntry, WeightEntry, WorkoutEntry } from "../backend.d";
import { useActor } from "./useActor";

export function useWorkoutHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<WorkoutEntry[]>({
    queryKey: ["workoutHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWorkoutHistory();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
    initialData: [],
  });
}

export function useWeightHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<WeightEntry[]>({
    queryKey: ["weightHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWeightHistory();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
    initialData: [],
  });
}

export function useWaterIntakeHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<WaterIntakeEntry[]>({
    queryKey: ["waterHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWaterIntakeHistory();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
    initialData: [],
  });
}

export function useLogWorkout() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      exerciseName: string;
      reps: number;
      sets: number;
      durationMinutes: number;
      caloriesBurned: number;
    }) => {
      if (!actor) return;
      await actor.logWorkout(
        params.exerciseName,
        BigInt(params.reps),
        BigInt(params.sets),
        BigInt(params.durationMinutes),
        BigInt(params.caloriesBurned),
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workoutHistory"] }),
  });
}

export function useLogWeight() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (weight: number) => {
      if (!actor) return;
      await actor.logWeight(BigInt(Math.round(weight * 10)));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["weightHistory"] }),
  });
}

export function useLogWater() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (amountMl: number) => {
      if (!actor) return;
      await actor.logWaterIntake(BigInt(amountMl));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["waterHistory"] }),
  });
}
