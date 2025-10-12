import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import TestInputs from '../pages/testingPages/TestInputs'
import HomePage from '../pages/Welcome/HomePage'
import DefultError from '../component/Errors/DefultError'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError /> } />
                    <Route index element={<HomePage /> } />
                    <Route path='/test' element={<TestInputs />} />
                </Route>
            </Routes>

            {/* <Route path='/Dashboard' element={<PrivateRoute element={<Dashboard /> } /> } >
            
            </Route> */}
        </BrowserRouter>
    )
}

export default App
