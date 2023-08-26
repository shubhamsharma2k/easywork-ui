import axios from 'axios'
import { getBearerToken } from './TokenService'
import { CoursesModel } from '../store/models/course'

const url = 'https://easywork-api.onrender.com/api/course'

export const CourseService = {
    getCourses: async () => {
        try {
            const token: string = getBearerToken()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
            }
            return await axios.get(url + '/', config)
        } catch (err: any) {
            return err
        }
    },
    addCourse: async (courseData: CoursesModel) => {
        try {
            const token: string = getBearerToken()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
            }
            return await axios.post(url + '/', courseData, config)
        } catch (err: any) {
            return err
        }
    },
    editCourse: async (courseBody: CoursesModel) => {
        try {
            const token: string = getBearerToken()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
            }
            return await axios.put(url + '/' + courseBody._id, courseBody, config)
        } catch (err: any) {
            return err
        }
    },
    deleteCourse: async (id: string) => {
        try {
            const token: string = getBearerToken()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
            }
            return await axios.delete(url + '/' + id, config)
        } catch (err: any) {
            return err
        }
    },
}
