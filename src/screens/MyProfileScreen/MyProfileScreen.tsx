import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import {withAuthenticator} from '@aws-amplify/ui-react-native';
import { useAuthContext } from '../../contexts/AuthContext';

const MyProfileScreen = () => {
 
  return (
    <View>
      <Text>MyProfileScreen</Text>
      <Text></Text>
    </View>
  )
}

export default withAuthenticator(MyProfileScreen);