import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                </Route>
            </Routes>

            <Route path='/Dashboard' element={<PrivateRoute element={<Dashboard /> } /> } >
            
            </Route>
        </BrowserRouter>
    )
}

export default App
