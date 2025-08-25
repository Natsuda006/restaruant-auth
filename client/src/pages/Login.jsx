import  { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Swal from 'sweetalert2';
import AuthService from '../service/auth.service';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });
    const { login, user } = useAuthContext();
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const currentUser = await AuthService.login(
                loginForm.username,
                loginForm.password
            );
            if (currentUser && currentUser.status === 200) {
                // รวม token, authorities, userInfo ไว้ใน user context
                login({
                    ...currentUser.data.userInfo,
                    token: currentUser.data.token,
                    authorities: currentUser.data.authorities
                });
                await Swal.fire({
                    title: "User Login ",
                    text: "Login Successfully!",
                    icon: "success",
                });
                navigate("/");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: currentUser?.data?.message || "Invalid username or password",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error?.response?.data?.message || error.message || "Invalid username or password",
            });
        }
    };



    return (
        <div className="container mx-auto">
            <Navbar />
            <div>
                <h1 className="title justify-center text-3xl text-center m-5 p-5">
                    Grab Restaurant Login Form
                </h1>
            </div>
            {error && <div style={{ color: "red", textAlign: "center", marginBottom: 12 }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-center justify-center'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Username:</legend>
                        <input type="text" className="input flex items-center gap-2 w-2xl" placeholder="Username..." onChange={handleChange} value={loginForm.username} name="username" />
                    </fieldset>
                </div>
                <div className='flex flex-center justify-center'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password:</legend>
                        <input type="password" className="input flex items-center gap-2 w-2xl" placeholder="Password..." onChange={handleChange} value={loginForm.password} name="password" />
                    </fieldset>
                </div>
                <div className="flex flex-center justify-center gap-4 mt-6">
                    <button type="submit" className="btn btn-outline btn-primary">Login</button>
                    <button type="button" className="btn btn-outline btn-secondary" onClick={() => navigate("/register")}>Register</button>
                </div>
            </form>
        </div>
    );
}
export default Login;