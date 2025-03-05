import { Navigate, Outlet } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


// Middleware pour vérifier si l'utilisateur est admin
const AdminMiddleware = () => {

    const checkifUserIsAdmin = async() => {

        try{

            const response = await fetch(`${API_URL}/api/admin/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            if(!data.success){
                return <Navigate to="/login" />;
            }
        }
        catch(e){
            throw new Error('AdminMiddlewares erreur :', e)
        }
    }

    checkifUserIsAdmin();

    return <Outlet />;
}

export default AdminMiddleware;
