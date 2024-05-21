import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LandingPage } from '@/app/landing-page/landing-page'
import { SignUp } from '@/app/auth/sign-up'
import { SignIn } from '@/app/auth/sign-in'
import { UnauthenticatedLayout } from '@/layout/unauthenticated'
import { AuthenticatedLayout } from '@/layout/authenticated'
import { Board } from '@/app/root/board'
import { Desktop } from '@/app/root/desktop'
import { Member } from '@/app/root/member'

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
        }
    ]
    }
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
