
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const PublicRoute = () => {
    const { token } = useAuth();
    return !token ? <Outlet /> : <Navigate to="/profile" replace />;
};