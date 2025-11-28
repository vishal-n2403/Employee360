const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGO_URI;

        // If no URI provided or local connection fails, use In-Memory DB
        if (!mongoUri || mongoUri.includes('localhost')) {
            console.log('Attempting to connect to local MongoDB...');
            try {
                await mongoose.connect(mongoUri || 'mongodb://localhost:27017/employee360_db');
                console.log('MongoDB Connected (Local)');
            } catch (err) {
                console.log('Local MongoDB not found, starting In-Memory Database...');
                const mongod = await MongoMemoryServer.create();
                mongoUri = mongod.getUri();
                await mongoose.connect(mongoUri);
                console.log(`MongoDB Connected (In-Memory) at ${mongoUri}`);
            }
        } else {
            await mongoose.connect(mongoUri);
            console.log('MongoDB Connected (Cloud)');
        }
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};

connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Employee360 Backend API is running');
});

// Import Routes
const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const taskRoutes = require('./routes/task.routes');
const statsRoutes = require('./routes/stats.routes');

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/stats', statsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// For Vercel, we export the app
module.exports = app;

// Only listen if not running on Vercel (local development)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
