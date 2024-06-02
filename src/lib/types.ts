export type Desktop = {
    desktop_id: number
    title: string
    description: string
}

export type Project = {
    project_id: number
    title: string
    description: string
}

export type Frame = {
    frame_id: number
    model_id: number
    title: string
    description: string
}

export type KanbanColumn = {
    kanbancolumn_id: number
    title: string
}

export type KanbanCard = {
    kanbancard_id: number
    kanbancolumn_id: number
    title: string
    description: string
    deadline?: Date
}

export type Checklist = {
    checklist_id: number
    userdesktop_id: number
    priority_id?: number
    title: string
    description: string
    marked: boolean
    deadline?: Date
}

export type Note = {
    note_id: number
    title: string
    content: string
}