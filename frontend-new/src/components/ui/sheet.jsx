import React from "react";
import { X } from "lucide-react";

export function Sheet({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => onOpenChange(false)}
      />

      {/* Drawer */}
      {children}
    </div>
  );
}

export function SheetContent({ children, className = "" }) {
  return (
    <div
      className={`fixed right-0 top-0 h-full bg-white shadow-xl z-50 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

export function SheetHeader({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function SheetTitle({ children, className = "" }) {
  return <h2 className={className}>{children}</h2>;
}