import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Swal from 'sweetalert2';
import AuthService from '../service/auth.service';
const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const currentUser = await AuthService.login(
                user.username,
                user.password
            );
            if (currentUser && currentUser.status === 200) {
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

//     const handleSubmit = async () => {
//   setError("");
//   try {
//     const response = await fetch("http://localhost:5000/api/v1/auth/signin", {
//       method: "POST",
//       body: JSON.stringify(user),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });

//     const data = await response.json();

//     if (response.ok && data.token) {
//       localStorage.setItem("token", data.token);

//       await Swal.fire({
//         icon: "success",
//         title: "Login Success",
//         text: "Welcome back!",
//         showConfirmButton: false,
//         timer: 1500
//       });

//       window.location.href = "/";
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: data.message || "Invalid username or password",
//       });
//     }
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: "An error occurred while logging in",
//     });
//     console.error("Login error:", error);
//   }
// };


    // const handleSubmit = async () => 
    //     {
    //     setError("");
    //     try {
    //         const response = await fetch("http://localhost:5000/api/v1/auth/signin", {
    //             method: "POST",
    //             body: JSON.stringify(user),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         const data = await response.json();
    //         if (response.ok && data.token) {
    //             localStorage.setItem("token", data.token);
    //             alert("Login success!");
    //             window.location.href = "/";
    //         } else {
    //             setError(data.message || "Login failed");
    //         }
    //     } catch (error) {
    //         setError("An error occurred while logging in");
    //     }
    // };

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
                        <input type="text" className="input flex items-center gap-2 w-2xl" placeholder="Username..." onChange={handleChange} value={user.username} name="username" />
                    </fieldset>
                </div>
                <div className='flex flex-center justify-center'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password:</legend>
                        <input type="password" className="input flex items-center gap-2 w-2xl" placeholder="Password..." onChange={handleChange} value={user.password} name="password" />
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
