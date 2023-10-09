import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {Button} from '@aws-amplify/ui-react-native/dist/primitives';
import * as Location from 'expo-location';
import React from 'react';

export function SignOutButton() {
  const {signOut} = useAuthenticator();
  return (
    <Button title="sign out" onPress={signOut}>
      Se déconnecter
    </Button>
  );
}
