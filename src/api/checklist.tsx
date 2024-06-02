import { toast } from 'sonner'
import axios from './config/axios'

export const getChecklists = async (frame_id: number) => {
    try {
        const results = await axios.get(`/checklist/${frame_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const getChecklist = async (checklist_id: number) => {
    try {
        const results = await axios.get(`/checklist/single/${checklist_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const postChecklist = async (frame_id: number, values: { userdesktop_id: number, priority_id: number, title: string, description: string, deadline: Date }) => {
    console.log("alooooo")
    try {
        const results = await axios.post(`/checklist/${frame_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const updateChecklist = async (checklist_id: number, values: { title: string, description: string, marked: boolean, deadline: Date }) => {
    try {
        const results = await axios.patch(`/checklist/${checklist_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const deleteChecklist = async (checklist_id: number) => {
    try {
        const results = await axios.patch(`/checklist/delete/${checklist_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}