const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Employee = require('../models/Employee');

router.get('/dashboard', async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const totalTasks = await Task.countDocuments();

        const taskStatusCounts = await Task.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const tasksByStatus = {
            Pending: 0,
            'In Progress': 0,
            Completed: 0
        };

        taskStatusCounts.forEach(item => {
            if (tasksByStatus[item._id] !== undefined) {
                tasksByStatus[item._id] = item.count;
            }
        });

        res.json({
            totalEmployees,
            totalTasks,
            tasksByStatus
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
