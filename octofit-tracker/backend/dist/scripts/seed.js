"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
// Seed the octofit_db database with test data
async function seed() {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    await (0, models_1.connectToDatabase)(mongoUri);
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    await Promise.all([
        models_1.User.create([
            { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'captain', status: 'active' },
            { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'member', status: 'active' },
            { name: 'Mina Alvarez', email: 'mina.alvarez@example.com', role: 'coach', status: 'active' },
        ]),
        models_1.Team.create([
            { name: 'Ocean Striders', sport: 'running', members: 4, focus: 'endurance' },
            { name: 'Peak Performers', sport: 'strength', members: 6, focus: 'power' },
        ]),
        models_1.Activity.create([
            { type: 'run', durationMinutes: 35, calories: 320, notes: 'Morning interval training' },
            { type: 'yoga', durationMinutes: 45, calories: 180, notes: 'Recovery session' },
            { type: 'cycling', durationMinutes: 60, calories: 510, notes: 'Tempo ride' },
        ]),
        models_1.LeaderboardEntry.create([
            { name: 'Ava Chen', score: 980, rank: 1, streak: 7 },
            { name: 'Noah Patel', score: 915, rank: 2, streak: 4 },
            { name: 'Mina Alvarez', score: 890, rank: 3, streak: 5 },
        ]),
        models_1.Workout.create([
            { title: 'Core Blast', difficulty: 'intermediate', durationMinutes: 25, focus: 'abs' },
            { title: 'Morning Mobility', difficulty: 'beginner', durationMinutes: 15, focus: 'mobility' },
            { title: 'Hill Sprints', difficulty: 'advanced', durationMinutes: 30, focus: 'speed' },
        ]),
    ]);
    console.log('Seeded octofit_db with realistic sample data.');
    process.exit(0);
}
seed().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
