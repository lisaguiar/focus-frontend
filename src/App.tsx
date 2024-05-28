import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LandingPage } from '@/app/landing-page/landing-page'
import { SignUp } from '@/app/auth/sign-up'
import { SignIn } from '@/app/auth/sign-in'
import { UnauthenticatedLayout } from '@/layout/unauthenticated'
import { AuthenticatedLayout } from '@/layout/authenticated'
import { Board } from '@/app/main/board'
import { Desktop } from '@/app/main/desktop'
import { Member } from '@/app/main/member'
import { Project } from './app/main/project'
import { Frame } from './app/main/frame'

const router = createBrowserRouter([
    {
        path: '/',
        element: <UnauthenticatedLayout />,
        children: [{
            path: '/',
            element: <LandingPage />
        },
        {
            path: '/sign-up',
            element: <SignUp />
        },
        {
            path: '/sign-in',
            element: <SignIn />
        }]
    },
    {
        path: '/:id',
        element: <AuthenticatedLayout />,
        children: [{
            path: '/:id/board',
            element: <Board />
        },
        {
            path: '/:id/d/:desktop_id',
            element: <Desktop />
        },
        {
            path: '/:id/d/:desktop_id/members',
            element: <Member />
        },
        {
            path: '/:id/d/:desktop_id/p/:project_id',
            element: <Project />
        },
        {
            path: '/:id/d/:desktop_id/p/:project_id/f/:frame_id',
            element: <Frame />
        },
    ]
    }
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
