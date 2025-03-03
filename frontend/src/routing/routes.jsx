import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout"; // Good
import Error from "../pages/Error"; // Good
import UserList from "../pages/userList";
import EditProfile from "../pages/profil";
import Login from "../pages/login";
import CreateAdmin from "../pages/admin/create";
import Home from "../pages/Home";
import AuthMiddleware from "../../middlewares/AuthMiddlewares";
import AdminMiddleware from "../../middlewares/AdminMiddlewares";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "login", element: <Login /> },
      { 
        element : <AuthMiddleware />,
        children: [
          { index: true, element: <Home /> },
          { path: "list", element: <UserList /> },
          { path: "profil-edit", element:<EditProfile />},
          { parh: 'admin', element : <AdminMiddleware/>,
            children: [
              { path: "admin/create", element: <CreateAdmin /> },
              { path: "admin/edit/:id", element:  <EditProfile /> },
            ]

          }
        ]
      },
      {path: '*', element: <Navigate to='/' replace />},
    ],
  },
]);

