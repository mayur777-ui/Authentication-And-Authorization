import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute({ children }) {
    const token = localStorage.getItem('token');
    
    // Redirect to login if there's no token
    if (!token) {
        return <Navigate to="/login" />;  // Redirect to login if the user is not authenticated
    }

    // If the token exists, render the child components (protected page)
    return children;
}
