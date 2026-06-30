import React from "react";

export function Select({ children }) {
  return <>{children}</>;
}

export function SelectTrigger({ children, className = "" }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children }) {
  return <div>{children}</div>;
}

export function SelectItem({ children, value }) {
  return <option value={value}>{children}</option>;
}