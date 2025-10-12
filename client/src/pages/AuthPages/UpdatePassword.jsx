import React from "react";
import useForm from "../../hooks/useForm";
import DefaultInput from "../../component/Form/DefaultInput";
import DefaultButton from "../../component/Buttons/DefaultButton";
import ShowError from "../../component/ErrorShow/ShowError";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";


const UpdatePassword = () => {

    const token = localStorage.getItem('emailverify');
    const navigate = useNavigate();

    const { values, handleChange } = useForm({
        newpassword: "",
        confirmnewpassword: ""
    });

    useEffect(() => {
        if (!token) {
            localStorage.clear();
            navigate('/', { replace: true });
        }
    }, [token, navigate])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { newpassword, confirmnewpassword } = values;

        if (newpassword !== confirmnewpassword) {
            alert("Passwords Not Match");
            return;
        }

        try {
            const res = await API.post(
                '/auth/update-password',
                { newpassword }, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (res.data.success === true || res.data.success === "true") {
                alert(res.data.message);
                localStorage.clear();
                navigate('/login');
            } else {
                setErrorMessage(res.data.error || "Something went wrong!");
            }
        } catch (err) {
            console.log(err);
        }
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
