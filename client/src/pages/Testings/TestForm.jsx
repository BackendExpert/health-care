import React, { useState } from 'react'
import DefaultInput from '../../components/Form/DefaultInput'
import DateInput from '../../components/Form/DateInput'
import Dropdown from '../../components/Form/Dropdown'
import FileInput from '../../components/Form/FileInput'
import TextAreaInput from '../../components/Form/TextAreaInput'

const TestForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthDate: '',
        gender: '',
        description: '',
        file: null,
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (files) {
            setFormData({ ...formData, [name]: files })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Submitted Data:', formData)
        alert('Form submitted! Check console for data.')
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Test Your Healthcare Inputs</h2>
            <form onSubmit={handleSubmit}>
                <DefaultInput
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                />
                <DefaultInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
                <DateInput
                    label="Birth Date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                />
                <Dropdown
                    label="Gender"
                    name="gender"
                    onChange={handleChange}
                    required
                    options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' },
                    ]}
                />
                <TextAreaInput
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your health or requirements..."
                    rows={4}
                />
                <FileInput
                    label="Upload Report"
                    name="file"
                    onChange={handleChange}
                    accept=".pdf,.jpg,.png"
                    multiple
                />

                <button
                    type="submit"
                    className="mt-4 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default TestForm
