const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    position: { type: String, required: true },
    department: { type: String, required: true },
    dateOfJoining: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
