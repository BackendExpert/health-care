import React from 'react'

const FileInput = ({ label, name, onChange, required = false, accept, multiple = false }) => {
    return (
        <div className="mb-6">
            {label && (
                <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <input
                type="file"
                name={name}
                id={name}
                onChange={onChange}
                required={required}
                accept={accept}
                multiple={multiple}
                className="block w-full text-sm text-gray-800 border border-gray-300 rounded-xl bg-white shadow-sm file:px-4 file:py-2 file:mr-4 file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
            />
        </div>
    )
}

export default FileInput
