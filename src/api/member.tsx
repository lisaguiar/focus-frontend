import axios from "./config/axios"

export const getMembers = async (desktop_id: number) =>{
    try {
        const results = await axios.get(`/member/${desktop_id}`)
        return results.data
    } catch (error) {
        return error
    }
}