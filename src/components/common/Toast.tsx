import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div id="toast-portal" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            id={`toast-${toast.id}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md transition-all ${
              toast.type === 'success'
                ? 'bg-[#2A1D15]/95 text-[#FAF7F2] border-[#73533D]/40'
                : toast.type === 'error'
                ? 'bg-[#3A1414]/95 text-[#FAF7F2] border-red-500/40'
                : toast.type === 'warning'
                ? 'bg-[#362712]/95 text-[#FAF7F2] border-amber-500/40'
                : 'bg-[#1E2522]/95 text-[#FAF7F2] border-[#4E6759]/40'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-emerald-400" />}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium tracking-wide leading-tight text-white">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-[#D8CCC0] mt-1 leading-relaxed">{toast.description}</p>
              )}
            </div>

            <button
              id={`close-toast-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-[#A89887] hover:text-white transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const Toast = ToastContainer;
