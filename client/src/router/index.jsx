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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError /> } />
                    <Route index element={<HomePage /> } />
                    <Route path='/test' element={<TestInputs />} />
                    <Route path='/create-account' element={<CreateAccount /> } />
                    <Route path='/login' element={<Login /> } />
                    <Route path='/forget-password' element={<ForgetPassword /> } />
                    <Route path='/verify-otp' element={<VerifyOTP /> } />
                </Route>
            </Routes>

            {/* <Route path='/Dashboard' element={<PrivateRoute element={<Dashboard /> } /> } >
            
            </Route> */}
        </BrowserRouter>
    )
}

export default App
