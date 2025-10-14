import React from "react";
import useForm from "../../hooks/useForm";
import DefaultInput from "../../component/Form/DefaultInput";
import DefaultButton from "../../component/Buttons/DefaultButton";
import { useNavigate } from "react-router-dom";
import ShowError from "../../component/ErrorShow/ShowError";
import { useState } from "react";
import { useEffect } from "react";
import API from "../../service/api";


const VerifyOTP = () => {
    const token = localStorage.getItem('emailverify');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            localStorage.clear();
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    const { values, handleChange } = useForm({
        otp: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/verify-otp', values, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success === true) {
                alert(res.data.message);
                navigate('/update-password');
            } else {
                setErrorMessage(res.data.error || "Something went wrong!");
            }
        } catch (err) {
            setErrorMessage(
                err.res?.data?.error || "Server error. Please try again later."
            );
        }
    };

    return (
        <div className="bg-gray-100/50 min-h-screen flex items-center justify-center px-4 py-10">
            <div className="bg-white shadow-md rounded-2xl p-8 md:p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Verify OTP
                </h2>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    The OTP already send to you given email, check the email
                </p>

                {errorMessage && (
                    <div className="mb-4">
                        <ShowError error_message={errorMessage} />
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <DefaultInput
                        label="Password Reset OTP"
                        type="text"
                        name="otp"
                        value={values.otp}
                        onChange={handleChange}
                        placeholder="Enter Password Reset OTP"
                        required
                    />

                    <DefaultButton label="Verify OTP" type="submit" />
                </form>

            </div>
        </div>
    );
};

export default VerifyOTP;
