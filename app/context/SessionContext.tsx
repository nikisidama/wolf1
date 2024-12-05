"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getSession } from "@/utils/cookie";
import axios from "axios";

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
        if (sessionData) {
          const response = await axios.get(`/api/user/get/${sessionData.id}`);
          const userData = response.data;
          
          setSession({
            ...sessionData,
            name: userData.profile?.name || sessionData.email.split("@")[0],
          });
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("Failed to fetch session or user data:", error);
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
