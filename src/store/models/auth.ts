import { Action, action, Thunk, thunk } from 'easy-peasy'
import { toast } from 'react-toastify'
import { getBearerToken } from '../../services/TokenService'
import { auth as authorizer } from '../../App'

export interface AuthModel {
    loginUser: Thunk<AuthModel, LoginModel>
    registerUser: Thunk<AuthModel, RegisterModel>
    user: UserModel
    setUser: Action<AuthModel, UserModel>
    isAuthenticated: boolean
    setIsAuthenticated: Action<AuthModel, boolean>
}

export interface UserModel {
    userData: {
        email: string
        firstName: string
        lastName: string
    }
}

export interface RegisterModel {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface LoginModel {
    email: string
    password: string
}
export const auth: AuthModel = {
    user: {
        userData: {
            email: '',
            firstName: '',
            lastName: '',
        },
    },
    isAuthenticated: false,
    setIsAuthenticated: action((state, payload) => {
        state.isAuthenticated = payload
    }),
    setUser: action((state, payload) => {
        state.user.userData.email = payload.userData.email
        state.user.userData.firstName = payload.userData.firstName
        state.user.userData.firstName = payload.userData.firstName
    }),
    loginUser: thunk(async (actions, payload, { fail, injections, getState }) => {
        const { authService } = injections

        const rsp = await authService.loginUser(payload.email, payload.password)
        if (rsp.status === 200) {
            const token = rsp.data.token
            if (token) {
                localStorage.setItem('token', token)
                actions.setIsAuthenticated(true)
                localStorage.setItem('user', JSON.stringify(rsp.data.user))
                actions.setUser({
                    userData: rsp.data.user,
                })
            }
        } else {
            toast.error(`Error logging in!`, {
                position: 'top-right',
            })
        }
        return rsp
    }),
    registerUser: thunk(async (actions, payload, { fail, injections, getState }) => {
        const { authService } = injections

        const rsp = await authService.registerUser(payload.firstName, payload.lastName, payload.email, payload.password)

        if (rsp.status === 200) {
        } else {
            if (rsp.response.status === 401) {
                const token = getBearerToken()
                if (token) {
                    authorizer(token)
                }
            }
        }

        return rsp
    }),
}
