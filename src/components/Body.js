import React from 'react'
import Sidebar from './Sidebar'
import MainContainer from './MainContainer'
import { Outlet } from 'react-router-dom'

export default function Body() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}
