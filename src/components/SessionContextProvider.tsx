import React, { useState, useEffect, createContext, useContext } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';

interface SessionContextType {
  session: Session | null;
  user: SupabaseUser | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[SessionContextProvider] Initializing session listener...');

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('[SessionContextProvider] Auth state changed:', _event, session);
      setSession(session);
      setUser(session?.user || null);
      setLoading(false); // Set to false after auth state change
    });

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        console.log('[SessionContextProvider] Initial session fetched:', session);
        setSession(session);
        setUser(session?.user || null);
      })
      .catch((error) => {
        console.error('[SessionContextProvider] Error fetching initial session:', error);
      })
      .finally(() => {
        // Ensure loading is set to false regardless of success or failure
        console.log('[SessionContextProvider] Initial session fetch completed, setting loading to false.');
        setLoading(false);
      });

    return () => {
      console.log('[SessionContextProvider] Unsubscribing from auth state changes.');
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, user, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};