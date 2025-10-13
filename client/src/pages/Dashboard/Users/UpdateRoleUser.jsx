import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../service/api";
import Dropdown from "../../../component/Form/Dropdown";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import { useAuth } from "../../../context/AuthContext";


const UpdateRoleUser = () => {
    const { auth } = useAuth()
    const { id } = useParams();
    const navigate = useNavigate();
    const [allroles, setAllRoles] = useState([]);
    const [oneuser, setOneUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    // Fetch all roles
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await API.get(`/user/roledata?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const roles = Array.isArray(res.data.result) ? res.data.result : [];
                setAllRoles(roles.map(r => ({ value: r._id, label: r.roleName || r.name })));
            } catch (err) {
                console.error("Failed to fetch roles:", err);
                setError("Failed to load roles.");
            }
        };
        fetchRoles();
    }, [token]);

    // Fetch specific user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get(`/user/getoneuser/${id}?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOneUser(res.data.result);
                setSelectedRole(res.data.result?.role?._id || "");
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setError("Failed to load user data.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, token]);

    // Handle role update
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedRole) return setError("Please select a role.");

        try {
            const res = await API.put(
                `/user/updateRole/${id}`,
                { roleId: selectedRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success === true) {
                alert(res.data.message)
                navigate('/Dashboard/users', { replace: true })
            }
            else {
                alert(res.data.error)
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (oneuser && auth) {
            if (oneuser._id === auth.id) {
                navigate('/Dashboard/users', { replace: true });
            }
        }
    }, [oneuser, auth, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-gray-600">
                Loading user data...
            </div>
        );
    }

    if (!oneuser) {
        return (
            <div className="text-center text-red-600 mt-10">
                Failed to load user information.
            </div>
        );
    }

    return (
        <div className="max-8xl-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Update User Role
            </h2>

            <div className="mb-6 -mt-6">
                <a href="/Dashboard/users">
                    <DefaultButton
                        type="button"
                        label="Back to Manage Users"
                    />
                </a>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-6 border">
                <p><span className="font-semibold text-gray-700">Name:</span> {oneuser.username}</p>
                <p><span className="font-semibold text-gray-700">Email:</span> {oneuser.email}</p>
                <p>
                    <span className="font-semibold text-gray-700">Current Role:</span>{" "}
                    <span className="text-purple-600 font-semibold">
                        {oneuser.role?.name || "No role assigned"}
                    </span>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Dropdown
                    label="Select New Role"
                    name="role"
                    onChange={(e) => setSelectedRole(e.target.value)}
                    required
                    options={allroles}
                />


                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition duration-200 font-semibold"
                >
                    Update Role
                </button>
            </form>
        </div>
    );
};

export default UpdateRoleUser;
