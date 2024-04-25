import axios from "./config/axios"

export const signup = async (values: { username: string, email: string, password: string }) => {
    try {
        await axios.post(`/auth/signup`, values)

        const { username, ...other} = values
        await signin(other)
    } catch (error) {
        //context error
    }
}

export const signin = async (values: { email: string, password: string }) => {
    try {
        const results = await axios.post(`/auth/signin`, values)
        localStorage.setItem('user', JSON.stringify(results.data))
        return results.data.id
    } catch (error) {
        //context error
    }
}

export const logout = async () => {
    localStorage.setItem('user', null)
    await axios.post(`/auth/logout`)
}

export const session = async () => {
    try {
        const results = await axios.get(`/auth/session`)
        return results
    } catch (error) {
        //context error
    }
}

export const userData = () => {
    try {
        const data = localStorage.getItem('user')
        if (data) {
            return JSON.parse(data)
        }
    } catch (error) {
        return null
    }
}