import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react'
import Navigation from './src/navigation';
import LocationContextProvider from './src/contexts/LocationContext';
import {MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import AuthContextProvider from './src/contexts/AuthContext';
import { Amplify } from 'aws-amplify';
import {Authenticator, withAuthenticator} from '@aws-amplify/ui-react-native';
import config from './src/aws-exports';
import Client from './src/apollo/Client';
import * as Linking from 'expo-linking';
Amplify.configure(config);

const prefix = Linking.createURL('/');
const App = () => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Client>
          <AuthContextProvider>
            <Authenticator.Provider>
              <LocationContextProvider>
                  <Navigation/>
              </LocationContextProvider>
            </Authenticator.Provider>
          </AuthContextProvider>
        </Client>
      </SafeAreaProvider>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withAuthenticator(App);
