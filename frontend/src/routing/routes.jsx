import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout"; // Good
import Error from "../pages/Error"; // Good
import UserList from "../pages/UserList";
import EditProfile from "../pages/profil";
import AdminEdit from "../pages/admin/edit";
import Login from "../pages/login";
import Home from "../pages/Home";
import AuthMiddleware from "../../middlewares/AuthMiddlewares";
import AdminMiddleware from "../../middlewares/AdminMiddlewares";
import AdminCreate from "../pages/admin/create";



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
          { path: "profil/edit", element:<EditProfile />},
          { parh: 'admin', element : <AdminMiddleware/>,
            children: [
              { path: "admin/create", element: <AdminCreate /> },
              { path: "admin/edit/:id", element:  <AdminEdit /> },
            ]

          }
        ]
      },
      {path: '*', element: <Navigate to='/' replace />},
    ],
  },
]);

