import { toast } from 'sonner'
import axios from './config/axios'

export const getKanbanColumns = async (frame_id: number) => {
    try {
        const results = await axios.get(`/kanban/column/${frame_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const postKanbanColumn = async (frame_id: number, values: { title: string }) => {
    try {
        const results = await axios.post(`/kanban/column/${frame_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const updateKanbanColumn = async (kanbancolumn_id: number, values: { title: string }) => {
    try {
        const results = await axios.patch(`/kanban/column/${kanbancolumn_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const deleteKanbanColumn = async (kanbancolumn_id: number) => {
    try {
        const results = await axios.patch(`/kanban/column/delete/${kanbancolumn_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const getKanbanCards = async (kanbancolumn_id: number) => {
    try {
        const results = await axios.get(`/kanban/card/${kanbancolumn_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const postKanbanCard = async (kanbancolumn_id: number, values: { priority_id?: number, userdesktop_id: number, member_id?: number, title: string, description?: string, deadline?: string }) => {
    try {
        const results = await axios.post(`/kanban/card/${kanbancolumn_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const updateKanbanCard = async (kanbancard_id: number, values: { title: string, description?: string, deadline?: string }) => {
    try {
        const results = await axios.patch(`/kanban/card/${kanbancard_id}`, values)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}

export const deleteKanbanCard = async (kanbancard_id: number) => {
    try {
        const results = await axios.patch(`/kanban/card/delete/${kanbancard_id}`)
        return results.data
    } catch (error: any) {
        toast(error.response.data.error)
    }
}