import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Update from "../pages/Update";
import Form from "../pages/Form";
import Delete from "../pages/Delete";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import Profile from "../pages/Profile";
import ModAndAdminPage from "../pages/ModAndAdmin";
import NotAllowed from "../pages/NotAllowed";
const router = createBrowserRouter([
   {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
     {
         path: "/notallowed",
         element: <NotAllowed />,
     },
    {
        path: "/register",
        element: <Register />,
    },

     {
         path: "/profile",
         element: <UserPage> <Profile /> </UserPage>,
     },

    {
        path: "/add",
        element: <AdminPage> <Form /> </AdminPage>
    },
        {
        path: "/update/:id",
        element: <ModAndAdminPage> <Update /> </ModAndAdminPage>,
    },
            {
        path: "/delete/:id",
        element: <Delete />,
    },
]);
export default router;