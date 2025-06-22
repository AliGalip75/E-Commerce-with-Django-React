import { motion, AnimatePresence } from "framer-motion";

const QuantityDisplay = ({ quantity }) => {
  return (
    <div className="relative w-6 h-6 overflow-hidden text-center font-bold text-lg">
      <AnimatePresence mode="wait">
        <motion.span
          key={quantity}
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 25, opacity: 5 }}
          transition={{ duration: 0.1 }}
          className="absolute inset-0"
        >
          {quantity}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default QuantityDisplay;