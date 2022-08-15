import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import PropTypes  from "prop-types";

export const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {},
    logout: () => {}
});

export function AuthContextProvider({children}){
    const [isAuthenticated, setAuthenticated] = useState(false);
    console.log(isAuthenticated)
    const login = useCallback(function () {
        setAuthenticated(true)
    },[])
    const logOut = useCallback(function () {
        setAuthenticated(false)
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('success')
    },[])

    return <AuthContext.Provider value={{isAuthenticated: isAuthenticated, login: login, logout: logOut}}>{children}</AuthContext.Provider>
}
export function useAuthContext(){
    return useContext(AuthContext)
};
