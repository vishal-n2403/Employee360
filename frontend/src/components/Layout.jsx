import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, CheckSquare, LogOut, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, icon: Icon, label }) => (
        <Link to={to}>
            <div className={`relative flex items-center px-6 py-4 transition-all duration-300 group ${isActive(to) ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                {isActive(to) && (
                    <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-r-4 border-indigo-500"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
                <Icon className={`w-5 h-5 mr-3 relative z-10 transition-transform group-hover:scale-110 ${isActive(to) ? 'text-indigo-400' : ''}`} />
                <span className="relative z-10 font-medium">{label}</span>
            </div>
        </Link>
    );

    return (
        <div className="flex h-screen bg-[#0f172a] text-slate-100 font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-72 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col shadow-2xl z-20">
                <div className="p-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <span className="text-xl font-bold text-white">E</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight">Employee360</h1>
                            <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">Workspace</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 mt-6 space-y-1">
                    <NavLink to="/" icon={LayoutDashboard} label="Dashboard" />
                    <NavLink to="/employees" icon={Users} label="Team Members" />
                    <NavLink to="/tasks" icon={CheckSquare} label="Tasks & Projects" />
                </nav>

                <div className="p-6 border-t border-slate-800/50 bg-slate-900/30">
                    <div className="flex items-center mb-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold shadow-md">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">{user?.username}</p>
                            <p className="text-xs text-slate-400 truncate">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-red-400 bg-red-500/10 rounded-xl hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 border border-red-500/10"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative h-full overflow-auto">
                    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
