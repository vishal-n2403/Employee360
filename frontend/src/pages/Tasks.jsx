import { useState, useEffect } from 'react';
import api from '../utils/axios';
import { Plus, Trash2, Edit2, CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending', assignedTo: '', dueDate: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const res = await api.get('/employees');
            setEmployees(res.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/tasks/${editingId}`, formData);
            } else {
                await api.post('/tasks', formData);
            }
            setIsModalOpen(false);
            setFormData({ title: '', description: '', status: 'Pending', assignedTo: '', dueDate: '' });
            setEditingId(null);
            fetchTasks();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const handleEdit = (task) => {
        setFormData({
            title: task.title,
            description: task.description,
            status: task.status,
            assignedTo: task.assignedTo?._id || '',
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
        });
        setEditingId(task._id);
        setIsModalOpen(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'In Progress': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
            default: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Tasks & Projects</h1>
                    <p className="mt-1 text-slate-400">Track progress and deadlines</p>
                </div>
                <Button onClick={() => { setIsModalOpen(true); setEditingId(null); setFormData({ title: '', description: '', status: 'Pending', assignedTo: '', dueDate: '' }); }} className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    New Task
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task, index) => (
                    <motion.div
                        key={task._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <GlassCard className="p-6 !bg-slate-800/50 !border-slate-700/50 hover:!border-indigo-500/50 transition-colors group">
                            <div className="flex items-start justify-between mb-4">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-lg border ${getStatusColor(task.status)}`}>
                                    {task.status}
                                </span>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(task)} className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(task._id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>

                            <h3 className="mb-2 text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{task.title}</h3>
                            <p className="mb-6 text-sm text-slate-400 line-clamp-2">{task.description}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                                <div className="flex items-center text-xs text-slate-500">
                                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}
                                </div>
                                <div className="flex items-center">
                                    <div className="w-6 h-6 mr-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                                        {task.assignedTo?.name?.charAt(0) || '?'}
                                    </div>
                                    <span className="text-xs text-slate-400 max-w-[80px] truncate">
                                        {task.assignedTo?.name || 'Unassigned'}
                                    </span>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md"
                        >
                            <GlassCard className="p-8 !bg-slate-800 !border-slate-700 shadow-2xl">
                                <h2 className="mb-6 text-2xl font-bold text-white">{editingId ? 'Edit Task' : 'Create New Task'}</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Task Title</label>
                                        <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                                        <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
                                            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                                                <option value="Pending" className="bg-slate-800">Pending</option>
                                                <option value="In Progress" className="bg-slate-800">In Progress</option>
                                                <option value="Completed" className="bg-slate-800">Completed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Due Date</label>
                                            <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Assign To</label>
                                        <select value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                                            <option value="" className="bg-slate-800">Select Team Member...</option>
                                            {employees.map(emp => (
                                                <option key={emp._id} value={emp._id} className="bg-slate-800">{emp.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex justify-end space-x-3 pt-6">
                                        <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="!bg-slate-700 !text-white !border-slate-600 hover:!bg-slate-600">Cancel</Button>
                                        <Button type="submit">Save Task</Button>
                                    </div>
                                </form>
                            </GlassCard>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tasks;
