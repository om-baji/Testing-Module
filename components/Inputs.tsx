import React from 'react'

const Inputs = ({ placeholder, label }: {
    placeholder: string,
    label: string
}) => {
    return (
        <div>
            <label
                htmlFor="in"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label}
            </label>
            <input
                id="in"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                type="text"
                placeholder={placeholder}
            />

        </div>

    )
}

export default Inputs
