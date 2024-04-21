
import React, { useContext } from "react";
import { createContext,  ReactNode, useState, SetStateAction, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { HubCallback } from "@aws-amplify/core";
import { useQuery, gql } from '@apollo/client';

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
    const [cognitoUser, setCognitoUser] = useState<{ email: string | undefined, sub: string | undefined}>({email: undefined, sub: undefined});
    const [user, setUser] = useState<User | null>(null);
    const { data, loading, error, refetch } = useQuery(USER_BY_EMAIL_AND_SUB, {
      variables: {
        email: cognitoUser?.email,
        subId: cognitoUser?.sub
      },
      skip: !cognitoUser?.email || !cognitoUser?.sub,
    });
    // data is null. Why.
    const checkUser = async () => {
      console.log('checking for cognito user to set the cognitoUser state variable to be able to query DB to see if DB user exists')
        try {
            await Auth.currentAuthenticatedUser({bypassCache: true})
              .then((user) => {
                setCognitoUser({email: user.attributes.email, sub: user.attributes.sub});
              })
        } catch (e) {
            // console.warn('cognito user not found :(')
            // setUser(null)
        }
    }
    console.log(cognitoUser.email, 'cognito user email from auth context')
    useEffect(() => {
      // Refetch only if cognitoUser is set and data is not yet available
      if (cognitoUser?.email && cognitoUser?.sub && !data?.userByEmailAndSub) {
        refetch();
      }
    }, [cognitoUser, refetch]);

    useEffect(() => {
      // Update the user state if data is available
      console.log(data, 'this is the data from user by email and sub query')
      if(data?.userByEmailAndSub){
        console.log(data.userByEmailAndSub, 'this is the result of user by email and sub query')
        const user = {id: data.userByEmailAndSub.id, role: data.userByEmailAndSub.role}
        setUser(user);
      }
    }, [data]);

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
        return () => hubListener();
    }, [])

    return (
        <AuthContext.Provider value={ {user} }>
        {/* // <AuthContext.Provider value={ { user: {id: "2208", role: "user"}}}> */}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext)
