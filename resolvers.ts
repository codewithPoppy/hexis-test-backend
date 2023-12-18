import { SupabaseClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("SUPABASE_URL and SUPABASE_KEY must be defined in .env");
}

const supabase: SupabaseClient = new SupabaseClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const randomCarbCode = () => {
  const mealTypes = ["Breakfast", "Lunch", "Dinner"];
  const isTracked = Math.random() >= 0.5;
  const caloriesMin = Math.floor(Math.random() * 5) * 100 + 500; // random number from 500 to 900
  const carbsMin = Math.floor(Math.random() * 5) * 10 + 100; // random number from 100 to 140
  const trackedCalories = Math.floor(Math.random() * 7) * 100 + 400; // random number from 400 to 1000

  return {
    meal_type: mealTypes[Math.floor(Math.random() * mealTypes.length)],
    is_tracked: isTracked,
    target_calories_min: caloriesMin,
    target_calories_max: caloriesMin + 200,
    target_carbs_min: carbsMin,
    target_carbs_max: carbsMin + 30,
    target_time: "08:30:00 AM",
    tracked_calories: trackedCalories,
    tracked_carbs: 50,
    tracked_protein: 40,
    tracked_fat: 20,
    tracked_time: "10:00:00 AM",
  };
};

const randomWorkout = () => {
  const popupTypes = ["min", "intra", "tracked"];
  const trackedCalories = Math.floor(Math.random() * 7) * 10 + 400; // random number from 400 to 1000

  return {
    popup_type: popupTypes[Math.floor(Math.random() * popupTypes.length)],
    workout_type: ["race", "strength", "endurance"][
      Math.floor(Math.random() * 3)
    ],
    start_time: "08:30",
    end_time: "09:30",
    description: "1 Hour Run",
    mod: 2,
    g_per_hour: 20,
    is_tracked: Math.random() >= 0.5,
    tracked_calories: trackedCalories,
    tracked_carbs: 50,
    tracked_protein: 40,
    tracked_fat: 20,
    tracked_time: "10:00",
  };
};

const randomMacro = () => {
  const calories = Math.floor(Math.random() * 7) * 100 + 1700; // random number between 1700 and 2300
  const carbs = Math.floor(Math.random() * 7) * 10 + 470; // random number between 470 and 530
  const protein = Math.floor(Math.random() * 7) * 10 + 170; // random number between 170 and 230
  const fat = Math.floor(Math.random() * 5) * 10 + 80; // random number between 80 and 120

  return {
    calories,
    carbs,
    protein,
    fat,
  };
};

const resolvers = {
  Query: {
    async carbCodes(_: any, { from, to }: { from: string; to: string }) {
      let { data, error, status } = await supabase
        .from("CarbCodes")
        .select("*")
        .gte("date", from)
        .lte("date", to);

      if (error) throw error;
      return data;
    },
    async macros(_: any, { from, to }: { from: string; to: string }) {
      let { data, error } = await supabase
        .from("Macros")
        .select("*")
        .gte("date", from)
        .lte("date", to);

      if (error) throw error;
      return data;
    },
    async workouts(_: any, { from, to }: { from: string; to: string }) {
      let { data, error } = await supabase
        .from("Workouts")
        .select("*")
        .gte("date", from)
        .lte("date", to);

      if (error) throw error;
      return data;
    },
  },
  Mutation: {
    async addCarbCode(_: any, args: { date: string }) {
      const { data, error, status, count } = await supabase
        .from("CarbCodes")
        .insert([{ ...randomCarbCode(), date: args.date }])
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;
      if (!data) throw new Error("No data returned from insert");
      return data[0];
    },
    async addMacro(_: any, args: { date: string }) {
      const { data, error } = await supabase
        .from("Macros")
        .insert([{ ...randomMacro(), date: args.date }])
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;
      if (!data) throw new Error("No data returned from insert");
      return data[0];
    },
    async addWorkout(_: any, args: { date: string }) {
      const { data, error } = await supabase
        .from("Workouts")
        .insert([{ ...randomWorkout(), date: args.date }])
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;
      if (!data) throw new Error("No data returned from insert");
      return data[0];
    },
    async deleteCarbCode(_: any, args: { id: string }) {
      const { error } = await supabase
        .from("CarbCodes")
        .delete()
        .eq("id", args.id);

      if (error) throw error;

      return "success";
    },
    async deleteMacro(_: any, args: { id: string }) {
      const { error } = await supabase
        .from("Macros")
        .delete()
        .eq("id", args.id);

      if (error) throw error;

      return "success";
    },
    async deleteWorkout(_: any, args: { id: string }) {
      const { error } = await supabase
        .from("Workouts")
        .delete()
        .eq("id", args.id);

      if (error) throw error;

      return "success";
    },
  },
};

export default resolvers;
