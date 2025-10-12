import React from 'react'
import { Outlet } from 'react-router-dom'

const StudentDashboard = () => {
    return (
        <div>
            <div className="">
                Nav
            </div>
            <div className="">
                <Outlet />
            </div>
            <div className="">
                Footer
            </div>
        </div>
    )
}

export default StudentDashboard