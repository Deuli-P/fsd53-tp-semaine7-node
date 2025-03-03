import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

const AdminMiddleware = () => {
    const {  user } = useAuth();


    const checkifUserIsAdmin = async() => {

        try{
            // const response = await fetch(`${API_URL}/user/${user.id}`, {
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
            // if(!data.isAdmin){
            //     return <Navigate to="/login" />;
            // }
        }
        catch(e){
            console.log('AdminMiddlewares erreur :', e)
        }
    }

   
    
    if (!user.isAdmin) {
        return <Navigate to="/login" />;
    }

    checkifUserIsAdmin();
    
    return <Outlet />;
}

export default AdminMiddleware;
