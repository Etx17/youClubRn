import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React, { useState } from 'react';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import LocationContextProvider from './src/contexts/LocationContext';
export default function App() {
  
   return (
    // <NavigationContainer>
    //   <View style={styles.container}>
    //     <HomeScreen/>
    //   </View>
    // </NavigationContainer>
    // <View style={styles.container}>
       <SafeAreaProvider>
        <LocationContextProvider>
        <Navigation/>
        </LocationContextProvider>
      </SafeAreaProvider>
    // </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
