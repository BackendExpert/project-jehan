import React, { useState } from "react";
import API from "../../service/api";
import useForm from "../../hooks/useForm";
import ShowError from "../../component/ErrorShow/ShowError";
import DefaultButton from "../../component/Buttons/DefaultButton";
import FileInput from "../../component/Form/FileInput";
import TextAreaInput from "../../component/Form/TextAreaInput";
import DefaultInput from "../../component/Form/DefaultInput";


const CreateNote = () => {
    const token = localStorage.getItem("login")
    const { values, handleChange } = useForm({
        title: "",
        content: "",
    });

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("content", values.content);
            if (file) formData.append("notefile", file);

            const response = await API.post("/notes", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data.success) {
                setError(response.data.message || "Failed to create note");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Create a New Note
            </h2>

            {error && <ShowError error_message={error} />}

            <form onSubmit={handleSubmit}>
                <DefaultInput
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="Enter note title"
                    required
                />

                <TextAreaInput
                    label="Content"
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    placeholder="Write your note here..."
                    rows={6}
                    required
                />

                <FileInput
                    label="Attach File"
                    name="notefile"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.png,.txt"
                    required
                />

                <div className="mt-6 flex justify-center">
                    <DefaultButton
                        type="submit"
                        label={loading ? "Creating..." : "Create Note"}
                        disabled={loading}
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateNote;
