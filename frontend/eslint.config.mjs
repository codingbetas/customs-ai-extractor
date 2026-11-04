"use client";
import { useState } from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  const [role, setRole] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("role") || "executive";
    }
    return "executive";
  });

  const changeRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
    window.dispatchEvent(new Event("roleChange"));
  };

  return (
    <html lang="en">
      <body>
        <div className="fixed top-2 right-2 z-50 text-xs bg-white border border-gray-300 rounded-md px-3 py-1.5 shadow-sm">
          Role:{" "}
          <select
            value={role}
            onChange={(e) => changeRole(e.target.value)}
            className="border-none bg-transparent font-medium"
          >
            <option value="executive">Executive</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        {children}
      </body>
    </html>
  );
}