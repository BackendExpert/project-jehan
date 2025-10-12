import React from "react";
import useForm from "../../hooks/useForm";
import DefaultInput from "../../component/Form/DefaultInput";
import DefaultButton from "../../component/Buttons/DefaultButton";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const ForgetPassword = () => {
    const { handleEmailVerificationToken } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem('forgetpass')
    
    const { values, handleChange } = useForm({
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password reset request:", values);
        // Here you would call your API endpoint for sending reset email
    };

    return (
        <div className="bg-gray-100/50 min-h-screen flex items-center justify-center px-4 py-10">
            <div className="bg-white shadow-md rounded-2xl p-8 md:p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Forgot Password
                </h2>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    Enter your email address to receive a password reset OTP.
                </p>

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

                    <DefaultButton label="Send Reset OTP" type="submit" />
                </form>

                <div className="text-center mt-4">
                    <a
                        href="/login"
                        className="text-pink-500 font-semibold hover:underline"
                    >
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
