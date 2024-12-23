import Details from '@/components/Details'
import PasswordDetails from '@/components/PasswordDetails'
import React from 'react'

const Password = () => {
    return (
        <div className='grid grid-cols-1 '>

            <div className='p-12 flex justify-center items-center bg-gradient-to-r from-rose-300 to-rose-200'>
                <h1 className='text-white text-4xl font-bold'>परीक्षा मित्र</h1>
            </div>

            <div className='flex justify-center items-center py-12 bg-gradient-to-b from-yellow-50 to-blue-100'>
                <div className='bg-white shadow-md rounded-lg p-8 w-full max-w-3xl'>
                    <PasswordDetails />
                </div>
            </div>
        </div>
    )
}

export default Password
