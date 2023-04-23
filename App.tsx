import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import colors from './src/themes/colors';
import React, { useState } from 'react';
import  font from './src/themes/fonts';
import {Image} from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'react-native-linear-gradient';
export default function App() {


  const images = [
    "https://picsum.photos/seed/630/3000/2000",
    "https://picsum.photos/seed/696/3000/2000",
    "https://picsum.photos/seed/695/3000/2000",
    "https://picsum.photos/seed/697/3000/2000",
    "https://picsum.photos/seed/664/3000/2000",
    "https://picsum.photos/seed/633/3000/2000",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { width } = Dimensions.get('window');
  const changeImage = (direction: String) => {
    if (direction === 'left') {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  console.log(currentImageIndex);
  
  return (
    <View style={styles.container}>
    <View style={styles.card}>
  
      

        <Image
          style={styles.image}
          source={{uri: images[currentImageIndex]}}
          contentFit="cover"
          transition={0}
        />
        
        <Pressable style={styles.leftButton} onPress={() => changeImage('left')}/>
        <Pressable style={styles.rightButton} onPress={() => changeImage('right')}/>

        <View style={styles.indexButtonContainer}>
        {
          images.length > 1 && images.map((_, index) => (
          <View
            key={index}
            style={{
              width: `${80 / images.length}%`,
              height: 4,
              backgroundColor: `${
                index == currentImageIndex ? 'white' : 'darkgrey'
                }`,
                margin: 5,
              }}
            />
          ))}
        </View>
      
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backGroundImage: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)',
    position: 'relative',
  },

  leftButton: {
    width: "50%",
    height: "100%",
    position: 'absolute',
    left: 0,
  },
  rightButton: {
    width: "50%",
    height: "100%",
    position: 'absolute',
    right: 0,
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
  },

  indexButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    top: 0,
    paddingHorizontal: 5,
    overflow: 'hidden',
  },
});
