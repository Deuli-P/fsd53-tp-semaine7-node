import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";

const AdminMiddleware = () => {
    const { sessionToken, user } = useAuth();

    if (!sessionToken) {
        return <Navigate to="/login" />;
    }

    const checkifUserIsAdmin = async() => {
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
            // if(!data.isAdmin){
            //     return <Navigate to="/login" />;
            // }
        }
        catch(e){
            console.log('AdminMiddlewares erreur :', e)
        }
    }

    // chercher dans la DB si l'utilisateur existe
    // Si il existe vérifier que c'est un admin 

    
    if (!user.isAdmin) {
        return <Navigate to="/login" />;
    }

    checkifUserIsAdmin();
    
    return <Outlet />;
}

export default AdminMiddleware;
