import React, { useContext } from 'react'
import { Navigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
export const ProctectedRoute = ({ children }) => {

    const { user } = useContext(UserContext)
    
    console.log(user)

    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <>
            {children}
        </>
    )
}
