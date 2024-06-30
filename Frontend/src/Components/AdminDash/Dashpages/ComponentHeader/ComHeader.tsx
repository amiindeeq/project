import React from 'react'
import './ComHeader.css'
import { Link } from 'react-router-dom';
import { VscTrash } from 'react-icons/vsc'
import { Button } from '@material-tailwind/react';
export const ComHeader = (
    {
        btnText,
        title,
        to,
      }: {
        btnText: string;
        title: string;
        to: string;
        trash : string
      }
) => {
  return (
    <div className='flex justify-between items-center my-2 w-full '>
    <div>
      <h1 className='text-xl font-bold'>{title}</h1>
    </div>
    <div className='flex items-center justify-center gap-4'> 
      <Link to={`/dashboard/${to}`}>
        <Button className='bg-blue-500 rounded-[5px]'>
          {btnText}
        </Button>
      </Link>
     {/* <Link to={trash}>
     <div className='c-icon'>
        <VscTrash className='trash' />
      </div>
     </Link> */}
    </div>
  </div>
  )
}
