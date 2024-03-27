import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom';

interface Props{
    isAuthenticated: boolean;
    children? : ReactElement,
    adminRoute ? : boolean,
    isAdmin ? : boolean,
}

const ProtectedRoute = ({isAuthenticated,children,adminRoute,isAdmin}: Props, {redirect="/"}) => {
    if(!isAuthenticated) return <Navigate to={redirect}/>
 

    return children
}

export default ProtectedRoute