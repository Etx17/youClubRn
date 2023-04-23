import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colors from './src/themes/colors';
import  font from './src/themes/fonts';

import Ionicons from '@expo/vector-icons/Ionicons';
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: colors.primary, fontSize: font.size.md}}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
