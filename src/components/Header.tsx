import { Button } from '@chakra-ui/react'
import { useStoreActions, useStoreState } from '../store/config'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const { clearMetadata } = useStoreActions((action) => action.student)
    const { isAuthenticated } = useStoreState((state) => state.auth)
    return (
        <div style={{ height: '50px', backgroundColor: 'black' }}>
            {isAuthenticated && (
                <Button
                    onClick={() => {
                        navigate('/')
                        clearMetadata()
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                    }}
                >
                    Logout
                </Button>
            )}
        </div>
    )
}

export default Header
