import React, { useState } from 'react';
import DefaultInput from '../../component/Form/DefaultInput';
import DateInput from '../../component/Form/DateInput';
import Dropdown from '../../component/Form/Dropdown';
import FileInput from '../../component/Form/FileInput';
import TextAreaInput from '../../component/Form/TextAreaInput';
import DefaultButton from '../../component/Buttons/DefaultButton';


const TestInputs = () => {
    const [form, setForm] = useState({
        name: '',
        dob: '',
        gender: '',
        resume: null,
        bio: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', form);
        alert('Form submitted! Check console.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Test Inputs</h2>

                <DefaultInput label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
                <DateInput label="Date of Birth" name="dob" value={form.dob} onChange={handleChange} required />
                <Dropdown label="Gender" name="gender" value={form.gender} onChange={handleChange} options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                ]} required />
                <FileInput label="Resume" name="resume" onChange={handleChange} accept=".pdf,.doc,.docx" required />
                <TextAreaInput label="Bio" name="bio" value={form.bio} onChange={handleChange} placeholder="Write something about yourself..." required />

                <DefaultButton type="submit" label="Submit" />
            </form>
        </div>
    );
};

export default TestInputs;
