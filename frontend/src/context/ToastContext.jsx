import React, { createContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((msg, duration) => addToast(msg, 'success', duration), [addToast]);
  const error = useCallback((msg, duration) => addToast(msg, 'error', duration), [addToast]);
  const info = useCallback((msg, duration) => addToast(msg, 'info', duration), [addToast]);
  const warning = useCallback((msg, duration) => addToast(msg, 'warning', duration), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, info, warning }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => {
          let IconComponent = Info;
          let iconColor = 'var(--color-info)';
          if (toast.type === 'success') {
            IconComponent = CheckCircle2;
            iconColor = 'var(--color-success)';
          } else if (toast.type === 'error') {
            IconComponent = AlertCircle;
            iconColor = 'var(--color-danger)';
          } else if (toast.type === 'warning') {
            IconComponent = AlertCircle;
            iconColor = 'var(--color-warning)';
          }

          return (
            <div key={toast.id} className="toast" role="alert">
              <IconComponent size={20} color={iconColor} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1, color: 'var(--text-primary)', lineHeight: 1.4 }}>{toast.message}</div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
