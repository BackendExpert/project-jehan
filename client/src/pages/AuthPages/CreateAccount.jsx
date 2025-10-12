import React from "react";
import useForm from "../../hooks/useForm";
import DefaultInput from "../../component/Form/DefaultInput";
import DefaultButton from "../../component/Buttons/DefaultButton";
import API from "../../service/api";
import ShowError from "../../component/ErrorShow/ShowError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";


const CreateAccount = () => {
    const { handleEmailVerificationToken } = useAuth();
    const navigate = useNavigate();
    const { values, handleChange } = useForm({
        username: "",
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post('/auth/registation', values)
            if (res.data.success = true) {
                alert(res.data.message)
                handleEmailVerificationToken(res.data.token) //storre token for verify email
                navigate('/verify-email')
            }
            else {
                setErrorMessage(res.data.error || "Something went wrong!");
            }
        }
        catch (err) {
            setErrorMessage(
                err.res?.data?.error || "Server error. Please try again later."
            );
        }
    };

    return (
        <div className="bg-gray-100/50 min-h-screen flex items-center justify-center md:px-16 px-4 py-10">
            <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Left Form Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
                        Create Your Account
                    </h2>

                    {errorMessage && (
                        <div className="mb-4">
                            <ShowError error_message={errorMessage} />
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <DefaultInput
                            label="Username"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />

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

                        <DefaultButton label="Register Now" type="submit" />
                    </form>
                </div>

                {/* Right Image Section */}
                <div className="w-full md:w-1/2 relative">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://wallpapercave.com/wp/wp13669855.jpg')",
                        }}
                    ></div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

                    {/* Overlay Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full p-10">
                        <h2 className="text-3xl font-bold mb-3">Welcome!</h2>
                        <p className="text-gray-200 text-base max-w-md leading-relaxed">
                            Join the <strong>Student Note Management System</strong> and manage
                            your academic notes and materials with ease and efficiency.
                        </p>

                        <p className="mt-4">Already have Account ?</p>
                        <div className="">
                            <a href="/login">
                                <DefaultButton
                                    type="button"
                                    label="Create Account"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
