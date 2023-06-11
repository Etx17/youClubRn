import React, { useContext } from "react";
import { createContext,  ReactNode, useState, SetStateAction, useEffect } from "react";


export const AuthContext = createContext({
    user: {
        id: "",
        role: "",
        email: "",
        password: "",
    }
})
const AuthContextProvider = ({children}: {children: ReactNode}) => {
  
    return (
        <AuthContext.Provider value={{user: {id: '1', role: "club"}}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext)