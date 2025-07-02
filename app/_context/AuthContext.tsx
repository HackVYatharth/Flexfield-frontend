"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    playerAbout: string | null;
    playerContactNumber: string | null;
    playerDateOfBirth: string | null;
    playerEmail: string | null;
    playerLocation: string | null;
    playerName: string | null;
    playerId: number;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

    const authContextValue: AuthContextType = {
        user,
        setUser

    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
