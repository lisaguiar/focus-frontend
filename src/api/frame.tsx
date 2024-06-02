import { toast } from 'sonner'
import axios from './config/axios'

export const getFrames = async (project_id: number) => {
    try {
        const results = await axios.get(`/frame/${project_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const getFrame = async (frame_id: number) => {
    try {
        const results = await axios.get(`/frame/single/${frame_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const postFrame = async (project_id: number, values: { model_id: number, title: string, description: string }) => {
    try {
        const results = await axios.post(`/frame/${project_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const updateFrame = async (frame_id: number, values: { title: string, description: string }) => {
    try {
        const results = await axios.patch(`/frame/${frame_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const deleteFrame = async (frame_id: number) => {
    try {
        const results = await axios.patch(`/frame/delete/${frame_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}