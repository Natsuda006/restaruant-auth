import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ModAndAdmin = ({ children }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (
        user.authorities?.includes("ROLE_ADMIN") ||
        user.authorities?.includes("ROLE_MODERATOR")
    ) {
        return children;
    }

    return <Navigate to="/notallowed" replace />;
}
export default ModAndAdmin;
