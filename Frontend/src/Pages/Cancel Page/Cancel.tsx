import React from 'react'
import  {useNavigate}  from 'react-router-dom'




const Cancel = () => {

    const navigate = useNavigate()
  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
     <h1 className='s-text'> Something Went Wrong Please Try Again Later !!</h1>
      <div className='flex justify-center items-center my-4'>
      <button
      onClick={() => {
        navigate('/order')
      }}
      className='text-white rounded-xl px-6 py-3 bg-[#1a1a1a] '> Back To Order</button>
      </div>
      </div>
    </div>
  )
}

export default Cancel
