import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Nav/Nav'
import Footer from '../component/Footer/Footer'

const WebSite = () => {
    return (
        <div className=''>
            <div className="">
                <Navbar />
            </div>
            <div className="">
                <Outlet />
            </div>
            <div className="">
                <Footer />
            </div>
        </div>
    )
}

export default WebSite