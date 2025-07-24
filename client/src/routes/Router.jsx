import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Update from "../pages/Update";
import Form from "../pages/Form";
import Delete from "../pages/Delete";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/signin",
        element: <Signin />,
    },
    {
        path: "/signup",
        element: <Signup />,
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