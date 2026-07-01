import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
    status: { type: String, default: 'active' },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    sport: { type: String, default: 'fitness' },
    members: { type: Number, default: 1 },
    focus: { type: String, default: 'community' },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 30 },
    calories: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema(
  {
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    difficulty: { type: String, default: 'beginner' },
    durationMinutes: { type: Number, default: 20 },
    focus: { type: String, default: 'full body' },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.model('Workout', workoutSchema);

export async function connectToDatabase(mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db') {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  return mongoose.connect(mongoUri);
}
