"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const auth = localStorage.getItem("auth_status");
    if (auth === "granted") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "spot") {
      localStorage.setItem("auth_status", "granted");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Błędne hasło!");
    }
  };

  if (!isMounted) return null;

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">witaj</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="flex flex-col gap-2 p-8 border">
        <label>Podaj hasło:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-1 text-black"
          required
        />
        <button type="submit" className="bg-zinc-800 text-white p-1">
          Wejdź
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
