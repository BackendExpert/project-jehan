import React from "react";
import useForm from "../../hooks/useForm";
import DefaultInput from "../../component/Form/DefaultInput";
import DefaultButton from "../../component/Buttons/DefaultButton";

const UpdatePassword = () => {
    const { values, handleChange } = useForm({
        newpassword: "",
        confirmnewpassword: ""
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
                    Update Password
                </h2>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    Update Password from Here
                </p>

                <form onSubmit={handleSubmit}>
                    <DefaultInput
                        label="New Password"
                        type="password"
                        name="newpassword"
                        value={values.newpassword}
                        onChange={handleChange}
                        placeholder="Enter New Password"
                        required
                    />

                    <DefaultInput
                        label="Confirm New Password"
                        type="password"
                        name="confirmnewpassword"
                        value={values.confirmnewpassword}
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                        required
                    />

                    <DefaultButton label="Update Password" type="submit" />
                </form>

            </div>
        </div>
    );
};

export default UpdatePassword;
