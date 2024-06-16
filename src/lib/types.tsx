import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"


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

export type Member = {
    userdesktop_id: number
    permission_id: 1 | 2 | 3
    createdAt: Date
    email: string
}

export const members: Member[] = [
    {
        userdesktop_id: 1,
        permission_id: 1,
        createdAt: new Date("2024-02-01"),
        email: "m@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    },
    {
        userdesktop_id: 2,
        permission_id: 2,
        createdAt: new Date("2024-02-01"),
        email: "x@example.com",
    }
]

export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: "permission_id",
        header: () => <div className="pl-6">Permissão</div>,
        cell: ({ row }) => {
            const permission = row.getValue('permission_id') === 1 ? "Dono" : row.getValue('permission_id') === 2 ? "Administrador" : "Leitor"

            return <div className="pl-6">{permission}</div>
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="p-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: () => "Data de adição",
        cell: ({ row }) => {
            const createdAt = format(row.getValue('createdAt'), "PPP", {locale: ptBR})

            return <div className="font-medium">{createdAt}</div>
        },
    },
    {
        id: "actions",
        cell: () => {
            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem>Editar permissão</DropdownMenuItem>
                    <DropdownMenuItem>Excluir membro</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]