import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import StudentView from './components/Students/StudentView'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { store } from './store/config'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export const auth = (token: string) => {
    const decodedJwt = JSON.parse(atob(token.split('.')[1]))
    const user: any = localStorage.getItem('user')
    const parsedUser = JSON.parse(user)
    if (decodedJwt.exp * 1000 < Date.now()) {
        store.getActions().auth.setIsAuthenticated(false)
    } else {
        if (parsedUser && parsedUser._id === decodedJwt.user.id) {
            store.getActions().auth.setIsAuthenticated(true)
            store.getActions().auth.setUser({
                userData: {
                    email: parsedUser.email,
                    firstName: parsedUser.firstName,
                    lastName: parsedUser.lastName,
                },
            })
        }
    }
}

function App() {
    const token = localStorage.getItem('token')
    if (token) {
        auth(token)
    }

    useEffect(() => {
        if (!store.getState().student.metadataFetched) {
            fetchMetadata()
        }
    }, [])

    const fetchMetadata = async () => {
        await store.getActions().student.getStudents()
    }

    return (
        <div>
            <ToastContainer autoClose={2000} />
            <Router>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route element={<Home />} path="/home" />
                        <Route element={<StudentView />} path="/student" />
                    </Route>
                    <Route element={<Signin />} path="/" />
                    <Route element={<Signup />} path="/signup" />
                </Routes>
            </Router>
        </div>
    )
}

export default App
