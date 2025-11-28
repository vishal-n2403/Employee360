import { useState, useEffect } from 'react';
import api from '../utils/axios';
import { Plus, Trash2, Edit2, Search, Filter } from 'lucide-react';
import CreatableSelect from 'react-select/creatable';
import { positionOptions, departmentOptions } from '../data/employeeOptions';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', position: '', department: '' });
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

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
                await api.put(`/employees/${editingId}`, formData);
            } else {
                await api.post('/employees', formData);
            }
            setIsModalOpen(false);
            setFormData({ name: '', email: '', phone: '', position: '', department: '' });
            setEditingId(null);
            fetchEmployees();
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await api.delete(`/employees/${id}`);
                fetchEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const handleEdit = (employee) => {
        setFormData({
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            position: employee.position,
            department: employee.department
        });
        setEditingId(employee._id);
        setIsModalOpen(true);
    };

    const handleSelectChange = (newValue, actionMeta) => {
        setFormData({ ...formData, [actionMeta.name]: newValue ? newValue.value : '' });
    };

    const getSelectValue = (options, value) => {
        if (!value) return null;
        for (const group of options) {
            const found = group.options.find(opt => opt.value === value);
            if (found) return found;
        }
        return { value, label: value };
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: 'rgba(15, 23, 42, 0.5)', // slate-900/50
            borderColor: 'rgba(51, 65, 85, 0.5)', // slate-700/50
            color: 'white',
            '&:hover': { borderColor: '#6366f1' },
            boxShadow: 'none',
            padding: '4px',
            borderRadius: '0.75rem'
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#1e293b', // slate-800
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(51, 65, 85, 0.5)'
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
            color: 'white',
            cursor: 'pointer'
        }),
        singleValue: (base) => ({
            ...base,
            color: 'white'
        }),
        input: (base) => ({
            ...base,
            color: 'white'
        })
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Team Members</h1>
                    <p className="mt-1 text-slate-400">Manage your workforce efficiently</p>
                </div>
                <Button onClick={() => { setIsModalOpen(true); setEditingId(null); setFormData({ name: '', email: '', phone: '', position: '', department: '' }); }} className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Member
                </Button>
            </div>

            <GlassCard className="!bg-slate-800/50 !border-slate-700/50 overflow-hidden">
                <div className="p-4 border-b border-slate-700/50 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                    </div>
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-700/50">
                        <thead className="bg-slate-900/30">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {filteredEmployees.map((employee) => (
                                <tr key={employee._id} className="hover:bg-slate-700/20 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold mr-3">
                                                {employee.name.charAt(0)}
                                            </div>
                                            <div className="text-sm font-medium text-white">{employee.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-300">{employee.email}</div>
                                        <div className="text-xs text-slate-500">{employee.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-medium rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                            {employee.position}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{employee.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(employee)} className="text-indigo-400 hover:text-indigo-300 mr-3 transition-colors"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(employee._id)} className="text-red-400 hover:text-red-300 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>

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
                                <h2 className="mb-6 text-2xl font-bold text-white">{editingId ? 'Edit Member' : 'Add New Member'}</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                                        <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Position</label>
                                        <CreatableSelect
                                            name="position"
                                            options={positionOptions}
                                            value={getSelectValue(positionOptions, formData.position)}
                                            onChange={handleSelectChange}
                                            styles={customStyles}
                                            placeholder="Select position..."
                                            isClearable
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Department</label>
                                        <CreatableSelect
                                            name="department"
                                            options={departmentOptions}
                                            value={getSelectValue(departmentOptions, formData.department)}
                                            onChange={handleSelectChange}
                                            styles={customStyles}
                                            placeholder="Select department..."
                                            isClearable
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-end space-x-3 pt-6">
                                        <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="!bg-slate-700 !text-white !border-slate-600 hover:!bg-slate-600">Cancel</Button>
                                        <Button type="submit">Save Member</Button>
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

export default Employees;
