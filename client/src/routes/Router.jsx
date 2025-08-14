import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Update from "../pages/Update";
import Form from "../pages/Form";
import Delete from "../pages/Delete";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
        path: "/register",
        element: <Register />,
    },

    {
        path: "/add",
        element: <Form />,
    },
        {
        path: "/update/:id",
        element: <Update />,
    },
            {
        path: "/delete/:id",
        element: <Delete />,
    },
]);
export default router;