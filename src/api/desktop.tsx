import { toast } from "sonner"
import axios from "./config/axios"

export const getDesktops = async (user_id: number) => {
    try {
        const results = await axios.get(`/desktop/${user_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const getDesktop = async (desktop_id: number) => {
    try {
        const results = await axios.get(`/desktop/single/${desktop_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const postDesktop = async (user_id: number, values: { title: string, description: string }) => {
    try {
        const results = await axios.post(`/desktop/${user_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const updateDesktop = async (desktop_id: number, values: { title: string, description: string }) => {
    try {
        const results = await axios.patch(`/desktop/${desktop_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const deleteDesktop = async (desktop_id: number) => {
    try {
        const results = await axios.patch(`/desktop/delete/${desktop_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}