import { useState, useEffect, useContext } from 'react';
import api from '../utils/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AuthContext } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { Users, CheckCircle, Clock, List } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/stats/dashboard');
                setStats(res.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    if (!stats) return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );

    const taskData = [
        { name: 'Pending', value: stats.tasksByStatus.Pending },
        { name: 'In Progress', value: stats.tasksByStatus['In Progress'] },
        { name: 'Completed', value: stats.tasksByStatus.Completed },
    ];

    const COLORS = ['#F59E0B', '#6366F1', '#10B981'];

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <GlassCard className="p-6 !bg-slate-800/50 !border-slate-700/50">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-400">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-white">{value}</p>
                </div>
                <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
            </div>
        </GlassCard>
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="mt-1 text-slate-400">Welcome back, {user?.username} 👋</p>
                </div>
                <div className="text-sm text-slate-500 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Employees" value={stats.totalEmployees} icon={Users} color="bg-indigo-500 text-indigo-400" />
                <StatCard title="Total Tasks" value={stats.totalTasks} icon={List} color="bg-purple-500 text-purple-400" />
                <StatCard title="Completed" value={stats.tasksByStatus.Completed} icon={CheckCircle} color="bg-emerald-500 text-emerald-400" />
                <StatCard title="Pending" value={stats.tasksByStatus.Pending} icon={Clock} color="bg-amber-500 text-amber-400" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <GlassCard className="p-6 !bg-slate-800/50 !border-slate-700/50">
                    <h3 className="mb-6 text-lg font-semibold text-white">Task Status Distribution</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={taskData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {taskData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard className="p-6 !bg-slate-800/50 !border-slate-700/50">
                    <h3 className="mb-6 text-lg font-semibold text-white">Task Overview</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={taskData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#334155', opacity: 0.4 }}
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                />
                                <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={40}>
                                    {taskData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default Dashboard;
