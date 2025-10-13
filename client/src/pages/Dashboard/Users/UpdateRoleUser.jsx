import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../service/api'

const UpdateRoleUser = () => {
    const { id } = useParams()
    const [allroles, setallroles] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get(`/user/roledata?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setallroles(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch Roles:", err);
                setallroles("Failed to load Roles.");
            }
        };
        fetchUsers();
    }, [token]);

    

    return (
        <div>

        </div>
    )
}

export default UpdateRoleUser