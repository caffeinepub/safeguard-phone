import Time "mo:core/Time";
import Text "mo:core/Text";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Add explicit migration function using with syntax

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  type WorkoutEntry = {
    exerciseName : Text;
    reps : Nat;
    sets : Nat;
    durationMinutes : Nat;
    caloriesBurned : Nat;
    timestamp : Time.Time;
  };

  type WeightEntry = {
    weight : Nat;
    timestamp : Time.Time;
  };

  type WaterIntakeEntry = {
    amountMl : Nat;
    timestamp : Time.Time;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let workoutEntries = Map.empty<Principal, List.List<WorkoutEntry>>();
  let weightEntries = Map.empty<Principal, List.List<WeightEntry>>();
  let waterIntakeEntries = Map.empty<Principal, List.List<WaterIntakeEntry>>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Workout Logging
  public shared ({ caller }) func logWorkout(exerciseName : Text, reps : Nat, sets : Nat, durationMinutes : Nat, caloriesBurned : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can log workouts");
    };

    let newEntry : WorkoutEntry = {
      exerciseName;
      reps;
      sets;
      durationMinutes;
      caloriesBurned;
      timestamp = Time.now();
    };

    let existingEntries = switch (workoutEntries.get(caller)) {
      case (null) { List.empty<WorkoutEntry>() };
      case (?entries) { entries };
    };

    existingEntries.add(newEntry);
  };

  // Weight Logging
  public shared ({ caller }) func logWeight(weight : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can log weight");
    };

    let newEntry : WeightEntry = {
      weight;
      timestamp = Time.now();
    };

    let existingEntries = switch (weightEntries.get(caller)) {
      case (null) { List.empty<WeightEntry>() };
      case (?entries) { entries };
    };

    existingEntries.add(newEntry);
  };

  // Water Intake Logging
  public shared ({ caller }) func logWaterIntake(amountMl : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can log water intake");
    };

    let newEntry : WaterIntakeEntry = {
      amountMl;
      timestamp = Time.now();
    };

    let existingEntries = switch (waterIntakeEntries.get(caller)) {
      case (null) { List.empty<WaterIntakeEntry>() };
      case (?entries) { entries };
    };

    existingEntries.add(newEntry);
  };

  // Query Workout History
  public query ({ caller }) func getWorkoutHistory() : async [WorkoutEntry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view workout history");
    };
    switch (workoutEntries.get(caller)) {
      case (null) { [] };
      case (?entries) { entries.toArray() };
    };
  };

  // Query Weight History
  public query ({ caller }) func getWeightHistory() : async [WeightEntry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view weight history");
    };
    switch (weightEntries.get(caller)) {
      case (null) { [] };
      case (?entries) { entries.toArray() };
    };
  };

  // Query Water Intake History
  public query ({ caller }) func getWaterIntakeHistory() : async [WaterIntakeEntry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view water intake history");
    };
    switch (waterIntakeEntries.get(caller)) {
      case (null) { [] };
      case (?entries) { entries.toArray() };
    };
  };

  // Admin function to view any user's workout history
  public query ({ caller }) func getUserWorkoutHistory(user : Principal) : async [WorkoutEntry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view other users' workout history");
    };
    switch (workoutEntries.get(user)) {
      case (null) { [] };
      case (?entries) { entries.toArray() };
    };
  };

  // Admin function to view any user's weight history
  public query ({ caller }) func getUserWeightHistory(user : Principal) : async [WeightEntry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view other users' weight history");
    };
    switch (weightEntries.get(user)) {
      case (null) { [] };
      case (?entries) { entries.toArray() };
    };
  };

  // Admin function to view any user's water intake history
  public query ({ caller }) func getUserWaterIntakeHistory(user : Principal) : async [WaterIntakeEntry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view other users' water intake history");
    };
    switch (waterIntakeEntries.get(user)) {
      case (null) { [] };
      case (?entries) { entries.toArray() };
    };
  };
};
