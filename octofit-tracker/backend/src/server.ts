import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
import { User, Team, Activity, LeaderboardEntry, Workout } from './models';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    apiUrl: apiBaseUrl,
  });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ score: -1 }).lean();
  res.json(leaderboard);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

connectToDatabase(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
