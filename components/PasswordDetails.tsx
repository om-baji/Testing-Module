"use client"
import React from 'react';
import Inputs from './Inputs';

const PasswordDetails: React.FC = () => {

    return (
        <div className="flex flex-col gap-8 p-12 rounded-lg max-w-4xl mx-auto">
            <div className="text-center text-2xl font-semibold text-gray-800">
                Set Password
            </div>

            <div className='flex flex-col gap-4'>
                <Inputs placeholder='system gen username' label='Username'/>
                <Inputs placeholder='********' label='Password'/>

                <div className='flex justify-center items-center mt-2'>
                    <button>Proceed</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordDetails;
