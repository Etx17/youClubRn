
import React, { useContext } from "react";
import { createContext,  ReactNode, useState, SetStateAction, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { HubCallback } from "@aws-amplify/core";
import { useQuery, gql } from '@apollo/client';
import { ActivityIndicator } from "react-native";
import ApiErrorMessage from "../components/apiErrorMessage/ApiErrorMessage";

type User = {
    id: string,
    role: string,
}
export const AuthContext = createContext({
    user: {
        id: "",
        role: "",
    },
})

const USER_BY_EMAIL_AND_SUB = gql`
  query UserByEmailAndSub($email: String!, $subId: String!) {
    userByEmailAndSub(email: $email, subId: $subId) {
      id
      role
    }
  }
`;

const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [cognitoUser, setCognitoUser] = useState<{ email: string, sub: string}>({email: "", sub: ""});
    const [user, setUser] = useState<User | null>(null);
    const { data, loading, error, refetch } = useQuery(USER_BY_EMAIL_AND_SUB, {
      variables: { email: cognitoUser.email, subId: cognitoUser.sub },
    });
    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true})
              .then((user) => {
                setCognitoUser({email: user.attributes.email, sub: user.attributes.sub});
                console.log('COGNITO-USER ATTRIBUTES', user.attributes.email, user.attributes.sub)
              })
        } catch (e) {
            setUser(null)
        }
    }


    useEffect(() => {
      if(data?.userByEmailAndSub){
        const user = {id: data.userByEmailAndSub.id, role: data.userByEmailAndSub.role}
        setUser(user)
      }
    }, [cognitoUser, data])

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
        <AuthContext.Provider value={ {user} }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext)
