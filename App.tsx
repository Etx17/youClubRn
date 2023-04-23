import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import colors from './src/themes/colors';
import React, { useState } from 'react';
import  font from './src/themes/fonts';
import {Image} from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntIcons from '@expo/vector-icons/AntDesign';
import {LinearGradient} from 'expo-linear-gradient';
import fonts from './src/themes/fonts';
import ClubCard from './src/components/ClubCard';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';

export default function App() {
  
  return (
    <View style={styles.container}>
      <HomeScreen/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
