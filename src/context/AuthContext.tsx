import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    role: string | null;
    setAuthData: (token: string, role: string) => void;
    clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

    const setAuthData = (token: string, role: string) => {
        setToken(token);
        setRole(role);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
    };

    const clearAuthData = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ token, role, setAuthData, clearAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
