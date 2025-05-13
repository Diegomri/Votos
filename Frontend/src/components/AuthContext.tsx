import { createContext, useContext, useState } from 'react';
import  type { ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    changePassword: (current: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    login: async () => {},
    logout: () => {},
    changePassword: async () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const login = async (email: string, password: string) => {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        localStorage.setItem('token', response.data.access_token);
        setToken(response.data.access_token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const changePassword = async (current: string, newPassword: string) => {
        await axios.post('http://localhost:5000/change-password', 
            { current_password: current, new_password: newPassword },
            { headers: { Authorization: `Bearer ${token}`,'Content-Type': 'application/json' } }
        );
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};