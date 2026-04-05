import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext({ showToast: () => {} });

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2600);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[60] flex w-[min(360px,calc(100%-2rem))] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            className={`glass-card rounded-2xl px-4 py-3 text-sm shadow-lg ${toast.type === 'error' ? 'border-rose-400/25 text-rose-100' : 'border-emerald-400/20 text-slate-100'}`}
            key={toast.id}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
