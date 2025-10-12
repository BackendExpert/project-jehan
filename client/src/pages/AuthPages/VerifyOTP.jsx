import React from "react";
import useForm from "../../hooks/useForm";
import DefaultInput from "../../component/Form/DefaultInput";
import DefaultButton from "../../component/Buttons/DefaultButton";

const VerifyOTP = () => {
    const { values, handleChange } = useForm({
        otp: "",
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
                    Verify OTP 
                </h2>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    The OTP already send to you given email, check the email
                </p>

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
