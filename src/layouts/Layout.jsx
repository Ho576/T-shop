import React from 'react'
import Navbar from '../componants/web/navbar/Navbar'
import Footer from '../componants/web/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
