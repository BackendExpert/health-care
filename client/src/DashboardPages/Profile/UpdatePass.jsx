import React, { useState } from 'react'
import DefaultInput from '../../components/Form/DefaultInput' 
import DefaultBtn from '../../components/Buttons/DefultBtn'

const UpdatePass = () => {
    const [updatepass, setupdatepass] = useState({
        currentpass: '',
        newpass: '',
    })

    const handleChange = (e) => {
        setupdatepass({ ...updatepass, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Updating Password:', updatepass)
        // place your axios call here
    }

    return (
        <div className="flex items-center justify-center p-6">
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
                        type='submit'
                        label='Update Password'
                    />
                </form>
            </div>
        </div>
    )
}

export default UpdatePass
