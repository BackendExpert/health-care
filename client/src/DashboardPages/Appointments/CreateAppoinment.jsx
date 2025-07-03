import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from '../../components/Form/Dropdown'
import DateInput from '../../components/Form/DateInput'
import DefaultBtn from '../../components/Buttons/DefultBtn'
import secureLocalStorage from 'react-secure-storage'
import { useNavigate } from 'react-router-dom'


const CreateAppoinment = () => {
    const navigate = useNavigate()
    const token = secureLocalStorage.getItem('login')
    const [formData, setFormData] = useState({
        doctorID: '',
        AppoinmentData: ''
    })
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_APP_API + '/appoinments/get-doctors', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                setDoctors(
                    res.data.Result.map(d => ({
                        value: d._id,
                        label: d.username
                    }))
                )
            } catch (err) {
                console.error('Error fetching doctors:', err)
            }
        }
        fetchDoctors()
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/appoinments/create-appoinment', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            if(res.data.Status === "Success"){
                alert(res.data.Message)
                navigate('/Dashboard/Appointments', { replace: true })
            }
            else{
                alert(res.data.Error)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
                Create Appointment
            </h2>
            <form onSubmit={handleSubmit}>
                <Dropdown
                    label="Doctor"
                    name="doctorID"
                    onChange={handleChange}
                    required
                    options={doctors}
                />
                <DateInput
                    label="Appointment Date"
                    name="AppoinmentData"
                    value={formData.AppoinmentData}
                    onChange={handleChange}
                    required
                />
                <DefaultBtn
                    type='submit'
                    label='Create Appointment'
                />
            </form>
        </div>
    )
}

export default CreateAppoinment
