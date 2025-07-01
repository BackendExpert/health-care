import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const TopNav = ({ show }) => {
  return (
    <div
      className={`bg-blue-50 py-3 px-6 flex flex-col md:flex-row justify-between items-center gap-4 
          shadow-sm fixed top-0 left-0 right-0 z-50 transition-transform duration-300
          ${show ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'}`}
      style={{ height: '60px' }} // fix height to 60px
    >
      <div className="text-2xl font-bold text-blue-700"></div>
      <div className="flex flex-col md:flex-row gap-4 text-blue-800 text-sm">
        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-blue-600" />
          <span>+94 71 123 4567</span>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-blue-600" />
          <span>info@myhealthcare.lk</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-600" />
          <span>Kandy, Sri Lanka</span>
        </div>
      </div>
    </div>
  )
}

export default TopNav
