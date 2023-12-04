import React from "react";
import { Navigate } from "react-router-dom";




const PrivateRouteApps = ({children}) => {
    
    return localStorage.getItem('authenticated') ? children:<Navigate to='../../login' />;
};

export default PrivateRouteApps;