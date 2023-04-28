import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React from 'react';

import Navigation from './src/navigation';
import LocationContextProvider from './src/contexts/LocationContext';
export default function App() {
  
   return (
  // Ne wrapper le location context provider que autour du topTabNavigator là ou j'en ai besoin
       <SafeAreaProvider>
        <LocationContextProvider> 
        <Navigation/>
        </LocationContextProvider>
      </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
