import { toast } from 'sonner'
import axios from './config/axios'

export const getNotes = async (frame_id: number) => {
    try {
        const results = await axios.get(`/note/${frame_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const getNote = async (note_id: number) => {
    try {
        const results = await axios.get(`/note/single/${note_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const postNote = async (frame_id: number, values: { userdesktop_id: number, title: string, content: string }) => {
    try {
        const results = await axios.post(`/note/${frame_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const updateNote = async (note_id: number, values: { title: string, content: string }) => {
    try {
        const results = await axios.patch(`/note/${note_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const deleteNote = async (note_id: number) => {
    try {
        const results = await axios.patch(`/note/delete/${note_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}