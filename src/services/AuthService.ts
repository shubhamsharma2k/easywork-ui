import axios from 'axios'

const url = 'https://easywork-api.onrender.com/api'

export const AuthService = {
    registerUser: async (firstName: string, lastName: string, email: string, password: string) => {
        try {
            return await axios.post(url + '/users/register', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            })
        } catch (err: any) {
            return err
        }
    },

    loginUser: async (email: string, password: string) => {
        try {
            return await axios.post(url + '/users/login', {
                email: email,
                password: password,
            })
        } catch (err: any) {
            return err
        }
    },
}
