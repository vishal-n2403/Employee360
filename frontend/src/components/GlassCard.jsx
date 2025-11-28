import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
