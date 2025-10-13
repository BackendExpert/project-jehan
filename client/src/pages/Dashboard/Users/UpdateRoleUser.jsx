import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../service/api'

const UpdateRoleUser = () => {
    const { id } = useParams()
    const [allroles, setallroles] = useState([]);
    const [oneuser, setoneuser] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchroles = async () => {
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
        fetchroles();
    }, [token]);

    useEffect(() => {
        const fetchoneuser = async () => {
            try {
                const res = await API.get(`/user/getoneuser/${id}roledata?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setoneuser(res.data.result);
            } catch (err) {
                console.error("Failed to fetch Roles:", err);
                setoneuser("Failed to load Roles.");
            }
        };
        fetchoneuser();
    }, [token]);



    return (
        <div>

        </div>
    )
}

export default UpdateRoleUser