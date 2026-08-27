"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error";
type ToastItem = { id: number; message: string; variant: ToastVariant };

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast deve ser usado dentro de ToastProvider.");
  return context;
}

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = ++nextId;
    setToasts((current) => [...current, { id, message, variant }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={cn(
              "pointer-events-auto flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-sm",
              toast.variant === "success"
                ? "border-border bg-card text-foreground"
                : "border-danger/30 bg-danger-soft text-danger",
            )}
          >
            {toast.variant === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
            ) : (
              <XCircle className="h-4 w-4 shrink-0 text-danger" />
            )}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
