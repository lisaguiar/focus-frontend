import axios from "./config/axios"

const pathname = window.location.pathname
const parts = pathname.split('/')

const values = {
    user_id: parts[1],
    desktop_id: parts[3],
    project_id: parts[5],
    frame_id: parts[7]
}

export const url = async (user_id: number | null) => {
    const url_id = Number(values.user_id)

    if (url_id === user_id) {
        try {
            const results = await axios.post(`/validate/url`, values)
            return results
        } catch (error) {
            return error
        }
    } else {
        const results = { data: { authorized: false }}
        return results
    }
}

export const token = async (user_id: number | null) => {
    try {
        if (user_id) {
            const results = await axios.get(`/validate/token/${user_id}`)
            return results
        } else {
            const results = { data: { authorized: false }}
            return results
        }   
    } catch (error) {
        return error
    }
}