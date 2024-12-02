"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getSession } from "@/utils/getSession";

type SessionData = {
  id: number;
  email: string;
  role: string;
  name: string;
} | null;

type SessionContextType = {
  session: SessionData;
  setSession: React.Dispatch<React.SetStateAction<SessionData>>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionData>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setSession(null);
      }
    };

    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};