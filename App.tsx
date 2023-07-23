import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react'
import Navigation from './src/navigation';
import LocationContextProvider from './src/contexts/LocationContext';
import {MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import AuthContextProvider from './src/contexts/AuthContext';
import colors from './src/themes/colors';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);


export default function App() {

   return (
      <PaperProvider>
        <SafeAreaProvider>
          <AuthContextProvider>
            <LocationContextProvider>
              <Navigation/>
            </LocationContextProvider>
          </AuthContextProvider>
        </SafeAreaProvider>
      </PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
