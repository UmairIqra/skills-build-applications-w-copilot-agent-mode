"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        apiUrl: apiBaseUrl,
    });
});
app.get('/api/users/', async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json(users);
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json(teams);
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find({}).lean();
    res.json(activities);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).sort({ score: -1 }).lean();
    res.json(leaderboard);
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json(workouts);
});
(0, models_1.connectToDatabase)(mongoUri)
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
