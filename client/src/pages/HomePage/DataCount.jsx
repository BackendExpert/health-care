import React from 'react'
import { FaUsers, FaUserDoctor, FaCrown } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";

const DataCount = () => {
    return (
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 py-16 px-6 sm:px-12 md:px-20 xl:px-56 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

                {[{
                    icon: <FaUsers className="text-white w-16 h-16" />,
                    count: "500+",
                    label: "Patients Every Day"
                }, {
                    icon: <FaUserDoctor className="text-white w-16 h-16" />,
                    count: "250+",
                    label: "Qualified Doctors"
                }, {
                    icon: <FaCrown className="text-white w-16 h-16" />,
                    count: "25+",
                    label: "Years Experience"
                }, {
                    icon: <MdHealthAndSafety className="text-white w-16 h-16" />,
                    count: "400+",
                    label: "Diagnosis Variety"
                }].map(({ icon, count, label }, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4"
                    >
                        <div>{icon}</div>
                        <div>
                            <h1 className="text-4xl font-extrabold">{count}</h1>
                            <p className="mt-1 text-lg">{label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DataCount
