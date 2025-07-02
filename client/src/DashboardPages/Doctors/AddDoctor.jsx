import React, { useState } from 'react';
import axios from 'axios';
import DefaultInput from '../../components/Form/DefaultInput';
import Dropdown from '../../components/Form/Dropdown';
import DefaultBtn from '../../components/Buttons/DefultBtn';

const AddDoctor = () => {
    const token = secureLocalStorage.getItem('login')
    const [formData, setFormData] = useState({
        exp: '',
        contactInfo: '',
        landline: '',
        hospital: '',
        section: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/doctor/create-doctor', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            if(res.data.Status === "Success"){
                alert(res.data.Message)
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        }
        catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-12 bg-white p-10 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-bold mb-8 text-center text-indigo-600">
                Add Doctor
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-4">
                    <DefaultInput
                        label="Experience (Years)"
                        type="number"
                        name="exp"
                        value={formData.exp}
                        onChange={handleChange}
                        required
                        placeholder="Enter years of experience"
                    />

                    <DefaultInput
                        label="Contact Info"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        required
                        placeholder="Phone or email"
                    />

                    <DefaultInput
                        label="Landline"
                        name="landline"
                        value={formData.landline}
                        onChange={handleChange}
                        placeholder="Landline number (optional)"
                    />

                    <DefaultInput
                        label="Hospital"
                        name="hospital"
                        value={formData.hospital}
                        onChange={handleChange}
                        placeholder="Hospital name (optional)"
                    />

                    <Dropdown
                        label="Section"
                        name="section"
                        onChange={handleChange}
                        required
                        options={[
                            { label: 'General Medicine', value: 'General Medicine' },
                            { label: 'Pediatrics', value: 'Pediatrics' },
                            { label: 'Surgery', value: 'Surgery' },
                            { label: 'Orthopedics', value: 'Orthopedics' },
                            { label: 'Cardiology', value: 'Cardiology' },
                            { label: 'Dermatology', value: 'Dermatology' },
                            { label: 'Neurology', value: 'Neurology' },
                        ]}
                    />
                </div>

                <div className="">
                    <DefaultBtn
                        type='submit'
                        label='Add New Doctor'
                    />
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;
