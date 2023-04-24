import React, {useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '../themes/colors';
import {Image} from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntIcons from '@expo/vector-icons/AntDesign';
import fonts from '../themes/fonts';

interface IClubCardProps {
  zIndex?: number;
}

const ClubCard = ({ zIndex }: IClubCardProps) => {

    const images = [
      "https://picsum.photos/seed/12/3000/2000",
      "https://picsum.photos/seed/10/3000/2000",
      "https://picsum.photos/seed/11/3000/2000",
      "https://picsum.photos/seed/13/3000/2000",
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const changeImage = (direction: String) => {
      if (direction === 'left') {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      } else {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    };

  return (
    <View style={styles.card}>
    <Image style={styles.image} source={{uri: images[currentImageIndex]}} contentFit="cover" transition={0} />
    <View style={styles.indexButtonContainer}>
      {
        images.length > 1 && images.map(
          (_, index) => (
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
        )
        )
      }
    </View>

    <LinearGradient end={{x: 0, y: 0.5}} start={{x: 0, y: 1}} colors={['rgba(0,0,0,1)', 'transparent']} style={{height: '100%', width: '100%', opacity: 0.8, position: 'absolute', bottom: 0}} >
    
      {/* Informations */}
      <View style={styles.informationsContainer}>
        <Pressable style={styles.leftButton} onPress={() => changeImage('left')}/>
        <Pressable style={styles.rightButton} onPress={() => changeImage('right')}/>

        {/* Title and arrow */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>Katan'Art Dojo </Text>
          <Pressable onPress={() => console.log('clicked')}>
            <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />
          </Pressable>
        </View>

        {/* Localisation */}
        <Text style={{color: 'white'}}>
          <Ionicons name="location-sharp" size={14} color="white" style={styles.locationIcon} /> 1 km
        </Text>

        {/* Description */}
        <Text style={styles.object} numberOfLines={3}>Basée sur la thérapie d'expression, MaîChaî _Ka c'est de la danse, de l'art, de l'écriture, et des coaching aux vibrations du ka, entre langage verbal et non verbal; les femmes investiront du temps pour elles dans le cadre de l'affirmation de soi et la réconciliation du corps</Text>
      </View>
      <Pressable onPress={() => console.log('clicked')}>
        <AntIcons name="hearto" size={24} color="white" style={{textAlign: 'center', paddingBottom: 15}} />
      </Pressable>
    </LinearGradient>
  </View>
  )
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
      position: 'relative',
      borderRadius: 10,
      overflow: 'hidden',
      
    },
    leftButton: {
      width: "50%",
      height: "100%",
      position: 'absolute',
      left: 10,
      top: 0,
    },
    rightButton: {
      width: "50%",
      height: "100%",
      position: 'absolute',
      right: 10,
      top: 0,
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
    informationsContainer: {
      flex: 1, 
      justifyContent: 'flex-end', 
      alignItems: 'flex-start',
      padding: 15
    },
    titleContainer: {
      display: 'flex', 
      width: '100%', 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'flex-end'
    },
    title: {
      fontSize: fonts.size.xxlg,
      fontWeight: fonts.weight.bold,
      color: colors.white,
      textShadowColor: 'rgba(0, 0, 0, 0.30)',
      textShadowOffset: {width: 2, height: 3},
      textShadowRadius: 7,
      width: '80%',
    },
    locationIcon: {
      textAlign: 'center', 
      textShadowColor: 'rgba(0, 0, 0, 0.30)', 
      textShadowOffset: {width: 1, height: 1}, 
      textShadowRadius: 7},
    object: {
      fontSize: fonts.size.default,
      color: colors.white,
    }
  });

export default ClubCard;