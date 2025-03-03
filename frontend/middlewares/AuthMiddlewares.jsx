import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";

const AuthMiddleware = () => {
    const { sessionToken, user } = useAuth();
    
    if (!sessionToken) {
        return <Navigate to="/login" />;
    }

    const checkIfConnected = async() => {
        try{
            // const response = await fetch({`${import.meta.env.VITE_API_URL}/users/${user.id}`}, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${sessionToken}`
            //     }
            // })
            // const data = await response.json()
            // if(!response.ok){
            //     throw new Error(data.message)
            // }
            // if(!data){
            //     return <Navigate to="/login" />;
            // }
        }
        catch(e){
            console.log('AdminMiddlewares erreur :', e)
        }
    }


    checkIfConnected();

    return <Outlet />;
}

export default AuthMiddleware;