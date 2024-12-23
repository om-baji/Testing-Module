"use client"
import React, { useState } from 'react';
import Inputs from './Inputs';
import Dropdown from './Dropdown';
import ToggleGroup from './ToggleButton';
import { OPTION } from '@/server/utils/types';

const Details: React.FC = () => {
    const [role, setRole] = useState<OPTION>(OPTION.Teacher)

    const handleRoleChange = (newRole: OPTION) => {
        setRole(newRole);
    };

    return (
        <div className="flex flex-col gap-8 p-12 rounded-lg max-w-4xl mx-auto">
            <div className="text-center text-2xl font-semibold text-gray-800">
                नोंदणी करा
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Inputs placeholder="First Name Here" label="पहिले नाव" />
                <Inputs placeholder="Middle Name Here" label="मधले नाव" />
                <Inputs placeholder="Surname Here" label="आडनाव" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <Inputs placeholder="DD/MM/YYYY" label="जन्मतारीख" />
                <ToggleGroup
                    selectedValue={role}
                    id="roleToggle"
                    label="भूमिका"
                    onChange={handleRoleChange}
                />
                <Dropdown
                    id="schoolDropdown"
                    placeholder="शाळेचे नाव निवडा"
                    label="शाळेचे नाव"
                    options={[
                        { value: "school1", label: "शाळा १" },
                        { value: "school2", label: "शाळा २" },
                        { value: "school3", label: "शाळा ३" },
                    ]}
                />
            </div>

            {role === OPTION.Teacher && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Inputs placeholder="someone@gmail.com" label="Email" />
                    <Inputs placeholder="wbc-xyz-xxx" label="Invitation Id" />
                </div>
            )}

            <div className="flex justify-center items-center mt-4">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Details;
