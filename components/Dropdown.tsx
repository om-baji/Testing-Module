import { dropDownProps } from "@/utils/types";
import React from "react";

const dropdownOptions = [
    { value: "option1", label: "पर्याय १ temporary" },
    { value: "option2", label: "पर्याय २" },
    { value: "option3", label: "पर्याय ३" },
];

const Dropdown: React.FC<dropDownProps> = ({ id, label, placeholder, onChange, value }) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label}
            </label>
            <select
                id={id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                onChange={onChange}
                value={value}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {dropdownOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
