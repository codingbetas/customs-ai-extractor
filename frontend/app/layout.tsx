"use client";
import { useState, useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState("executive");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("role");
    if (saved) setRole(saved);
  }, []);

  const changeRole = (newRole: string) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
    window.dispatchEvent(new Event("roleChange"));
  };

  return (
    <html lang="en">
      <body>
        {mounted && (
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
        )}
        {children}
      </body>
    </html>
  );
}