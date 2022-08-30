import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import PropTypes  from "prop-types";

export const AuthContext = createContext({
    isAuthenticated: sessionStorage.getItem('success'),
    // IdUser: sessionStorage.getItem('ID_Perfil'),
    login: () => {},
    logout: () => {}
});

export function AuthContextProvider({children}){
    const [isAuthenticated, setAuthenticated] = useState(sessionStorage.getItem('success'));
    const [confirmisAuthenticated, setConfirmisAuthenticated] = useState()
    // const IdUser = sessionStorage.getItem('ID_Perfil')
    const IdUser=2
    
    const login = useCallback(function () {
        setAuthenticated(true)
    },[])
    
    const logout = useCallback(function () {
        setAuthenticated(false)
        sessionStorage.clear()
    },[])
    const value = useMemo(
        ()=>({
            login,
            logout,
            isAuthenticated,
            IdUser
        }),
        [login, logout, isAuthenticated,IdUser]
    )
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuthContext(){
    return useContext(AuthContext)
};
