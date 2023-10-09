import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import {withAuthenticator} from '@aws-amplify/ui-react-native';
import { useAuthContext } from '../../contexts/AuthContext';
import { SignOutButton } from '../../components/auth/signOutButton';
const MyProfileScreen = () => {

  return (
    <View>
      <Text>MyProfileScreen</Text>
      {/* Signout button aws */}
      <SignOutButton />
    </View>
  )
}

export default MyProfileScreen;
