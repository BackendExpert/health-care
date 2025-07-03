import React, { useState } from 'react'
import DefaultInput from '../../components/Form/DefaultInput'
import DefaultBtn from '../../components/Buttons/DefultBtn'
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

const UpdatePass = () => {
    const token = secureLocalStorage.getItem('login')
    const [updatepass, setupdatepass] = useState({
        currentpass: '',
        newpass: '',
    })

    const handleChange = (e) => {
        setupdatepass({ ...updatepass, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_APP_API}/auth/update-password-dash`,
                updatepass,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.Status === "Success") {
                alert(res.data.Message || "Password updated successfully.")
                secureLocalStorage.clear()
                window.location.reload()
            } else {
                alert(res.data.Error || "Something went wrong.")
            }
        } catch (err) {
            console.log(err)
            alert("An error occurred while updating password.")
        }
    }

    return (
        <div className="flex items-center justify-center py-10 bg-gradient-to-br from-blue-50 to-white">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-5xl">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                    Update Password
                </h2>
                <form onSubmit={handleSubmit}>
                    <DefaultInput
                        label="Current Password"
                        type="password"
                        name="currentpass"
                        value={updatepass.currentpass}
                        onChange={handleChange}
                        placeholder="Enter current password"
                        required
                    />
                    <DefaultInput
                        label="New Password"
                        type="password"
                        name="newpass"
                        value={updatepass.newpass}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        required
                    />
                    <DefaultBtn
                        type="submit"
                        label="Update Password"
                    />
                </form>
            </div>
        </div>
    )
}

export default UpdatePass
