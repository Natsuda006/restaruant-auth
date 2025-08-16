import { useState, useContext, createContext, useEffect, } from "react";
import AuthService from "../service/auth.service";
import TokenService from "../service/token.service";

const AuthContext = createContext(null);

function getUser() {
    const currentUser = TokenService.getUser();
    return currentUser;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUser);
    const login = (user) => setUser(user);
    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    useEffect(() => {
        TokenService.setUser(user);
    },[user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
