import axios from "./config/axios"

export const getDesktops = async (user_id: number) => {
    try {
        const results = await axios.get(`/desktop/${user_id}`)
        return results.data
    } catch (error) {
        return error
    }
}

export const getDesktop = async (desktop_id: number) => {
    try {
        const results = await axios.get(`/desktop/single/${desktop_id}`)
        return results.data
    } catch (error) {
        return error
    }
}

export const postDesktop = async (user_id: number, values: { title: string, description: string }) => {
    try {
        console.log(user_id)
        const results = await axios.post(`/desktop/${user_id}`, values)
        //results = id da área criada
        return results.data
    } catch (error) {
        return error
    }
}