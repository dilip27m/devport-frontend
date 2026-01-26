"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface Alert {
    id: string;
    message: string;
    type: AlertType;
}

interface AlertContextType {
    showAlert: (message: string, type?: AlertType, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};

// --- ALERT COMPONENT ---
const AlertToast = ({ alert, onClose }: { alert: Alert; onClose: () => void }) => {
    const styles = {
        success: "bg-emerald-50 border-emerald-200 text-emerald-800",
        error: "bg-rose-50 border-rose-200 text-rose-800",
        warning: "bg-amber-50 border-amber-200 text-amber-800",
        info: "bg-blue-50 border-blue-200 text-blue-800",
    };

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
        error: <XCircle className="w-5 h-5 text-rose-500" />,
        warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`
        pointer-events-auto flex w-full max-w-sm items-start gap-4 rounded-xl border p-4 shadow-lg backdrop-blur-sm
        ${styles[alert.type]}
      `}
        >
            <div className="flex-shrink-0 mt-0.5">{icons[alert.type]}</div>
            <div className="flex-1">
                <p className="text-sm font-medium leading-5">{alert.message}</p>
            </div>
            <button
                onClick={onClose}
                className="flex-shrink-0 rounded-lg p-1 opacity-60 hover:opacity-100 hover:bg-black/5 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const showAlert = useCallback((message: string, type: AlertType = "info", duration: number = 4000) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newAlert: Alert = { id, message, type };

        setAlerts((prev) => [...prev, newAlert]);

        if (duration > 0) {
            setTimeout(() => {
                setAlerts((prev) => prev.filter((a) => a.id !== id));
            }, duration);
        }
    }, []);

    const removeAlert = (id: string) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {alerts.map((alert) => (
                        <AlertToast key={alert.id} alert={alert} onClose={() => removeAlert(alert.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </AlertContext.Provider>
    );
};
