"use client";
import { OPTION, ToggleGroupProps } from "@/server/utils/types";
import React, { useState } from "react";


const ToggleGroup: React.FC<ToggleGroupProps> = ({
    id,
    label,
    selectedValue: initialSelectedValue = OPTION.Student,
    onChange,
}) => {
    const [selectedValue, setSelectedValue] = useState(initialSelectedValue);

    const onToggle = (value: OPTION) => {
        setSelectedValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    const toggleOptions = [
        { value: OPTION.Teacher, label: "शिक्षक" },
        { value: OPTION.Student, label: "विद्यार्थी" },
    ];

    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label}
            </label>
            <div
                id={id}
                className="flex border border-gray-300 rounded-lg bg-gray-50 overflow-hidden"
            >
                {toggleOptions.map((option, index) => (
                    <button
                        key={index}
                        className={`flex-1 text-sm p-2.5 ${
                            selectedValue === option.value
                                ? "bg-blue-500 text-white"
                                : "text-gray-900"
                        } border-r last:border-r-0`}
                        onClick={() => onToggle(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ToggleGroup;
