import axios from './config/axios'

export const getProjects = async (desktop_id: number) => {
    try {
        const results = await axios.get(`/project/${desktop_id}`)
        return results.data
    } catch (error) {
        return error
    }
}

export const getProject = async (project_id: number) => {
    try {
        const results = await axios.get(`/project/single/${project_id}`)
        return results.data
    } catch (error) {
        return error
    }
}

export const postProject = async (desktop_id: number, values: { title: string, description: string }) => {
    console.log(values)
    try {
        const results = await axios.post(`/project/${desktop_id}`, values)
        return results.data
    } catch (error) {
        return error
    }
}

export const updateProject = async (project_id: number, values: { title: string, description: string }) => {
    try {
        const results = await axios.patch(`/project/${project_id}`, values)
        return results.data
    } catch (error) {
        return error
    }
}

export const deleteProject = async (project_id: number) => {
    try {
        const results = await axios.patch(`/project/delete/${project_id}`)
        return results.data
    } catch (error) {
        return error
    }
}