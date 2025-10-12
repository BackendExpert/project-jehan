import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import TestInputs from '../pages/testingPages/TestInputs'
import HomePage from '../pages/Welcome/HomePage'
import DefultError from '../component/Errors/DefultError'
import CreateAccount from '../pages/AuthPages/CreateAccount'
import Login from '../pages/AuthPages/Login'
import ForgetPassword from '../pages/AuthPages/ForgetPassword'
import VerifyOTP from '../pages/AuthPages/VerifyOTP'
import UpdatePassword from '../pages/AuthPages/UpdatePassword'
import VerifyEmail from '../pages/AuthPages/VerifyEmail'
import StudentDashboard from '../layouts/StudentDashboard'
import StdDash from '../pages/StudentDashboard/StdDash'
import Notifications from '../pages/Dashboard/Notifications'
import DashError from '../component/Dashboard/DashError'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError />} />
                    <Route index element={<HomePage />} />
                    <Route path='/test' element={<TestInputs />} />
                    <Route path='/create-account' element={<CreateAccount />} />
                    <Route path='/verify-email' element={<VerifyEmail />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/forget-password' element={<ForgetPassword />} />
                    <Route path='/verify-otp' element={<VerifyOTP />} />
                    <Route path='/update-password' element={<UpdatePassword />} />
                </Route>

                {/* for admin Dashboard */}
                <Route path='/Dashboard' element={<PrivateRoute roles={['admin']}><Dashboard /></PrivateRoute>} >
                    <Route path='*' element={<PrivateRoute roles={['admin']}><DashError /></PrivateRoute>} />                    
                    <Route path='notifications' element={<PrivateRoute roles={['admin']}><Notifications /></PrivateRoute>} />
                </Route>

                {/* for student dashboard */}
                <Route path='/my-account' element={<PrivateRoute roles={['admin', 'student']}><StudentDashboard /></PrivateRoute>}>
                    <Route index element={<PrivateRoute roles={['admin', 'student']}><StdDash /></PrivateRoute>} />
                </Route>
            </Routes>


        </BrowserRouter>
    )
}

export default App
