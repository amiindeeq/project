import React, { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import './DashRouter.css'

const DashRouter: React.FC = () => {
  const navigate = useNavigate()
  const role = JSON.parse(localStorage.getItem('userInfo')!)
  useEffect(() => {
    if (role.Role === 'User') {
      navigate('/')
    }
  }, [role.Role])
  return (
    <div className="dash-container   ">
      <div className="  ">
        <Sidebar />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  )
}

export default DashRouter
