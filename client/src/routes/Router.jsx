import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Update from "../pages/Update";
import Form from "../pages/Form";
import Delete from "../pages/Delete";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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