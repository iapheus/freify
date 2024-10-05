import { Button } from '@radix-ui/themes'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const notFoundCat = 'https://images.unsplash.com/photo-1557404838-0f7b750e3a04'
    const navigate = useNavigate();
  return (
<div className='flex items-center justify-center'>
    <div className='hidden sm:flex sm:flex-col sm:items-center sm:justify-center w-full'>
        <div className='flex flex-row items-center'>
            <img className='w-1/2 my-16' src={notFoundCat} alt="Not Found Cat" />
            <div className='mx-auto space-y-4'>
                <h1 className='text-2xl text-center my-auto'>Not Found</h1>
                <Button onClick={() => {navigate('/')}} size={'4'} color="gray" variant="outline" highContrast>
                    Go to Homepage
                </Button>
            </div>
        </div>
    </div>

    <div className='sm:hidden text-center'>
        <img className='w-8/12 mt-5 mx-auto' src={notFoundCat} alt="Not Found Cat" />
        <div className='space-y-4'>
            <h1 className='mt-5 text-2xl'>Not Found</h1>
            <Button onClick={() => {navigate('/')}} size={'4'} color="gray" variant="outline" highContrast>
                Go to Homepage
            </Button>
        </div>
    </div>
</div>



  )
}

export default NotFound