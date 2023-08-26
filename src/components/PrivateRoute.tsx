import { Outlet, Navigate } from 'react-router-dom'
import { useStoreState } from '../store/config'

const PrivateRoute = () => {
    const { isAuthenticated } = useStoreState((state) => state.auth)
    return !isAuthenticated ? <Navigate to={'/'} /> : <Outlet />
}

export default PrivateRoute
