import React from "react";
import useForm from "../../hooks/useForm";
import DefaultInput from "../../component/Form/DefaultInput";
import DefaultButton from "../../component/Buttons/DefaultButton";
import { useState } from "react";
import ShowError from "../../component/ErrorShow/ShowError";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");


    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', values);
            if (res.data.success === true) {
                alert(res.data.message);
                login(res.data.token);
                const decoded = jwtDecode(res.data.token);
                const role = decoded?.role;

                if (role === "admin") {
                    navigate('/Dashboard')
                } else if (role === "student") {
                    navigate('/my-account')
                } else {
                    navigate('/')
                }
            } else {
                setErrorMessage(res.data.error);
            }
        } catch (err) {
            setErrorMessage(
                err.res?.data?.error || "Server error. Please try again later."
            );
        }
    };

    return (
        <div className="bg-gray-100/50 min-h-screen flex items-center justify-center md:px-16 px-4 py-10">
            <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="w-full md:w-1/2 relative">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://wallpapercave.com/wp/wp15376630.jpg')",
                        }}
                    ></div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

                    {/* Overlay Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full p-10">
                        <h2 className="text-3xl font-bold mb-3">Welcome! Back</h2>
                        <p className="text-gray-200 text-base max-w-md leading-relaxed">
                            Join the <strong>Student Note Management System</strong> and manage
                            your academic notes and materials with ease and efficiency.
                        </p>

                        <div className="">
                            <a href="/create-account">
                                <DefaultButton
                                    type="button"
                                    label="Create Account"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Left Form Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
                        Login Here
                    </h2>
                    {errorMessage && (
                        <div className="mb-4">
                            <ShowError error_message={errorMessage} />
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <DefaultInput
                            label="Email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                        <DefaultInput
                            label="Password"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                        <DefaultButton label="Login" type="submit" />
                    </form>
                    <div className="">
                        <a href="/forget-password" className="text-pink-500 font-semibold mt-4 hover:underline">
                            Forget Password ?
                        </a>
                    </div>
                </div>

                {/* Right Image Section */}

            </div>
        </div>
    );
};

export default Login;
