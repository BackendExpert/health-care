import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import secureLocalStorage from 'react-secure-storage'
import { getUserInfoFromToken } from '../../utils/auth'
import axios from 'axios'
import DefaultBtn from '../../components/Buttons/DefultBtn'
import UpdatePatientInfor from './UpdatePatientInfor'

const Profile = () => {
    const userInfo = getUserInfoFromToken()
    const currentEmail = secureLocalStorage.getItem('loginE')
    const token = secureLocalStorage.getItem('login')

    const [btnvlauepatient, setbtnvlauepatient] = useState(false)

    const [curretuserdata, setcurretuserdata] = useState({})

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_API + '/user/current-userdata/' + currentEmail, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setcurretuserdata(res.data.Result))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <FaUser className="text-blue-700 text-2xl" />
                    </div>
                    <h1 className="ml-4 text-3xl font-bold text-blue-700">Profile Overview</h1>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-8">
                    <table className="w-full text-sm text-gray-700">
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <td className="py-3 font-semibold w-1/3 text-gray-600">Username</td>
                                <td className="py-3 text-gray-800">{curretuserdata.username || 'N/A'}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-3 font-semibold text-gray-600">Email</td>
                                <td className="py-3 text-gray-800">{curretuserdata.email || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="py-3 font-semibold text-gray-600">Role</td>
                                <td className="py-3 text-blue-700 font-medium uppercase">
                                    {curretuserdata.roles?.[0]?.name || 'N/A'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {
                    curretuserdata.roles?.[0]?.name === 'patient' ?
                        <div className="mt-4">
                            <DefaultBtn
                                type='button'
                                label={!btnvlauepatient ? 'Update Patient Information' : 'Close'}
                                onClick={() => setbtnvlauepatient(!btnvlauepatient)}
                            />
                        </div>
                        :
                        <div className=""></div>
                }

                {
                    curretuserdata.roles?.[0]?.name === 'patient' && btnvlauepatient === true ?
                        <div className="mt-4">
                            <UpdatePatientInfor />
                        </div>
                        :
                        <div className=""></div>
                }
            </div>
        </div>
    )
}

export default Profile
