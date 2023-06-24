import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react'
import Navigation from './src/navigation';
import LocationContextProvider from './src/contexts/LocationContext';
import {MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import AuthContextProvider from './src/contexts/AuthContext';
import colors from './src/themes/colors';
export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      secondary: colors.secondary,
    },
  };

   return (
  // Ne wrapper le location context provider que autour du topTabNavigator là ou j'en ai besoin
      <PaperProvider theme={theme}>
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
