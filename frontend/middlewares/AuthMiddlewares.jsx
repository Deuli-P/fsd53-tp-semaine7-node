import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";

const AuthMiddleware = () => {
    
    const { user} = useAuth();


    if (!user) {
        return <Navigate to="/login" replace />;
 }

    return <Outlet />;
}

export default AuthMiddleware;