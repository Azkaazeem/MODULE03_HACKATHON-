import { createContext, useCallback, useContext, useMemo } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const ToastContext = createContext({ showToast: () => {} });

const popupBase = {
  background: '#0d1f17',
  color: '#edf7f0',
  confirmButtonColor: '#22a559',
  customClass: {
    popup: 'smit-popup',
    title: 'smit-popup-title',
    htmlContainer: 'smit-popup-body',
    confirmButton: 'smit-popup-confirm',
  },
};

export const ToastProvider = ({ children }) => {
  const showToast = useCallback((message, type = 'success') => {
    const icon = type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'success';

    return Swal.fire({
      ...popupBase,
      toast: true,
      position: 'top-end',
      timer: 2600,
      timerProgressBar: true,
      showConfirmButton: false,
      icon,
      title: message,
    });
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);
