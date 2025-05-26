// src/context/SessionContext.jsx
"use client";

import { createContext, useContext, useState, useEffect, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const BaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10255";
  const router = useRouter();
  const pathname = usePathname();
  const hasFetched = useRef(false);

  const fetchSession = async () => {
    console.log(`SessionContext - Fetching session from ${BaseUrl}/auth/session`);
    const response = await fetch(`${BaseUrl}/auth/session`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`SessionContext - Fetch failed: ${response.status} - ${await response.text()}`);
      throw new Error("Failed to fetch session");
    }

    const data = await response.json();
    console.log(`SessionContext - Raw session data:`, JSON.stringify(data, null, 2));

    const sessionData = {
      user: {
        id: data.user?.id || null,
        email: data.user?.email || null,
        role: data.user?.role || null,
        firstname: data.user?.firstname || null,
      },
      token: data.token || null, // Add token if provided by backend
      expires: data.session?.expires || null,
    };

    if (!sessionData.user.id || (sessionData.expires && new Date() > new Date(sessionData.expires))) {
      console.warn(`SessionContext - Invalid or expired session:`, sessionData);
      throw new Error("Invalid or expired session");
    }

    return sessionData;
  };

  const updateSession = async (sessionData) => {
    if (!sessionData?.user?.id || !sessionData?.user?.role) {
      throw new Error("Invalid session data");
    }
    setSession(sessionData);
  };

  const logout = async () => {
    try {
      const response = await fetch(`${BaseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error(`SessionContext - Logout error: ${error.message}`);
    }

    setSession(null);
    hasFetched.current = false;
    router.replace("/login");
  };

  useEffect(() => {
    if (hasFetched.current) return;

    const initializeSession = async () => {
      setLoading(true);
      try {
        const sessionData = await fetchSession();
        setSession(sessionData);
        console.log(`SessionContext - Session set:`, JSON.stringify(sessionData, null, 2));
      } catch (error) {
        setSession(null);
        console.error(`SessionContext - Session initialization error: ${error.message}`);
        if (pathname !== "/login") {
          router.replace("/login");
        }
      } finally {
        setLoading(false);
        hasFetched.current = true;
      }
    };

    initializeSession();
  }, [pathname, router]); // Keep pathname to redirect on error

  const value = useMemo(
    () => ({ session, loading, logout, updateSession }),
    [session, loading]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};