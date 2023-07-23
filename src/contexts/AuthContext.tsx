import React, { useContext } from "react";
import { createContext,  ReactNode, useState, SetStateAction, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { HubCallback } from "@aws-amplify/core";

export const AuthContext = createContext({
    user: {
        id: "",
        role: "",
        email: "",
        password: "",
    },
    updateUser: (userData: any) => {},
})
const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState(null);
    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true})
            console.log(authUser.attributes.email, authUser.attributes.sub)
            setUser(authUser)
        } catch (e) {
            setUser(null)
        }
    }
    useEffect(() => {
        checkUser()
    }, [])
   
    useEffect(() => {
        const listener: HubCallback = (data) => {
         const {event} = data.payload;
         if(event === 'signOut'){
             setUser(null)
         }
         if(event === 'signIn'){
             checkUser();
         }
        }
        const hubListener = Hub.listen('auth', listener);
     // When you return a function frm a useEffect, it will be called when the component unmounts
         return () => hubListener();
     }, [])

    return (
        <AuthContext.Provider value={{user: {id: '1', role: "user"}}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext)