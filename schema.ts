import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    carbCodes(from: String!, to: String!): [CarbCode!]!
    macros(from: String!, to: String!): [Macro!]!
    workouts(from: String!, to: String!): [Workout!]!
  }

  type Mutation {
    addCarbCode(date: String!): CarbCode
    addMacro(date: String!): Macro
    addWorkout(date: String!): Workout
    deleteCarbCode(id: String!): String
    deleteMacro(id: String!): String
    deleteWorkout(id: String!): String
  }

  type CarbCode {
    id: ID!
    created_at: String!
    meal_type: String!
    is_tracked: Boolean!
    date: String!
    target_calories_min: Int!
    target_calories_max: Int!
    target_carbs_min: Int!
    target_carbs_max: Int!
    target_time: String!
    tracked_calories: Int!
    tracked_carbs: Int!
    tracked_protein: Int!
    tracked_fat: Int!
    tracked_time: String!
  }

  type Macro {
    id: ID!
    created_at: String!
    date: String!
    calories: Int!
    carbs: Int!
    protein: Int!
    fat: Int!
  }

  type Workout {
    id: ID!
    created_at: String!
    date: String!
    popup_type: String!
    workout_type: String!
    start_time: String!
    end_time: String!
    description: String!
    mod: Int!
    g_per_hour: Int!
    is_tracked: Boolean!
    tracked_calories: Int!
    tracked_carbs: Int!
    tracked_protein: Int!
    tracked_fat: Int!
    tracked_time: String!
  }
`;

export default typeDefs;
