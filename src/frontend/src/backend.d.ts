import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WaterIntakeEntry {
    amountMl: bigint;
    timestamp: Time;
}
export type Time = bigint;
export interface WorkoutEntry {
    reps: bigint;
    sets: bigint;
    durationMinutes: bigint;
    timestamp: Time;
    exerciseName: string;
    caloriesBurned: bigint;
}
export interface WeightEntry {
    weight: bigint;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserWaterIntakeHistory(user: Principal): Promise<Array<WaterIntakeEntry>>;
    getUserWeightHistory(user: Principal): Promise<Array<WeightEntry>>;
    getUserWorkoutHistory(user: Principal): Promise<Array<WorkoutEntry>>;
    getWaterIntakeHistory(): Promise<Array<WaterIntakeEntry>>;
    getWeightHistory(): Promise<Array<WeightEntry>>;
    getWorkoutHistory(): Promise<Array<WorkoutEntry>>;
    isCallerAdmin(): Promise<boolean>;
    logWaterIntake(amountMl: bigint): Promise<void>;
    logWeight(weight: bigint): Promise<void>;
    logWorkout(exerciseName: string, reps: bigint, sets: bigint, durationMinutes: bigint, caloriesBurned: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
