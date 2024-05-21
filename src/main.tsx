import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { AuthProvider } from './context/auth.tsx'
import { UserProvider } from './context/user.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UserProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </UserProvider>
    </React.StrictMode>,
)
