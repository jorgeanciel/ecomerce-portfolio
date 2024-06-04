import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const navigate = useNavigate()

    if (localStorage.getItem('token')) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

export default ProtectedRoutes