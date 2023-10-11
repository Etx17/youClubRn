import React, {useEffect, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '../themes/colors';
import {Image} from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntIcons from '@expo/vector-icons/AntDesign';
import fonts from '../themes/fonts';
import { useNavigation } from '@react-navigation/native';
import categoryImages from '../assets/data/categoryImages';
import { useLocationContext } from '../contexts/LocationContext';
import { getDistance } from '../services/GeoServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IClub {
  fields: {
    id: string,
  }
}
interface IClubCardProps {
  data: any
}
const ClubCard = ({data}: IClubCardProps) => {
  // console.log(data, 'data from club card')
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation();
  const {lat, lon} = useLocationContext()
  const clubLat = parseFloat(data["geoPoint"]?.split(',')[0])
  const clubLon = parseFloat(data["geoPoint"].split(',')[1])
  const distance = getDistance(lat, lon, clubLat, clubLon )
  const formattedDistance = distance.toFixed(1).toString() + ' km';
  // const city = data["city"]
  const titre = data["name"]
  const objet = data["objet"]
  const codepostal_actuel = data["actualZipcode"];
  const subCategory = data["subcategory"]
  const category = data["category"]
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log(category, subCategory)
  console.log(categoryImages[category][subCategory])
  const images = [
    `https://source.unsplash.com/random/?${categoryImages[category] ? categoryImages[category][subCategory][0] : 'random'}/300/200`
  ];

  const navigateToClubDetails = () => {
    navigation.navigate('ClubDetails', {clubData: data, images, darkTheme: true});
  }

    const changeImage = (direction: String) => {
      if (direction === 'left') {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      } else {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    };

    const handleLike = async () => {
      try {
          const likedClubsString = await AsyncStorage.getItem('likedClubs');
          let likedClubs = likedClubsString == null ? [] : JSON.parse(likedClubsString);
          const index = likedClubs.findIndex((club: IClub) => club.fields.id === data.fields.id);
          if(index !== -1) {
              likedClubs.splice(index, 1);
              setIsLiked(false);
          } else {
              likedClubs.push(data);
              setIsLiked(true);
          }
          await AsyncStorage.setItem('likedClubs', JSON.stringify(likedClubs));
      } catch (error) {
          console.error(error);
      }
    }

    useEffect(() => {
      const checkIfLiked = async () => {
          try {
              const likedClubsString = await AsyncStorage.getItem('likedClubs');
              let likedClubs = likedClubsString == null ? [] : JSON.parse(likedClubsString);
              const index = likedClubs?.findIndex((club: IClub) => club.fields.id === data.fields.id);
              setIsLiked(index !== -1); // If index is not found, its value is -1, so the club is not liked since it would be false
          } catch (error) {
              console.error(error);
          }
      };
      checkIfLiked();
    }, []);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: images[currentImageIndex]}} contentFit="cover" transition={0} />
        <View style={styles.indexButtonContainer}>
          { images.length > 1 && images.map( (_, index) => (
            <View key={index} style={{
              width: `${80 / images.length}%`,
              height: 4,
              backgroundColor: `${ index == currentImageIndex ? 'white' : 'darkgrey' }`, margin: 5,}}
            /> ) )
          }
        </View>

      <LinearGradient end={{x: 0, y: 0.4}} start={{x: 0, y: 1}} colors={['rgba(0,0,0,4)','transparent']} style={{height: '100%', width: '100%', opacity: 1, position: 'absolute', bottom: 0}} >

        {/* Informations */}
        <View style={styles.informationsContainer}>
          <Pressable style={styles.leftButton} onPress={() => changeImage('left')}/>
          <Pressable style={styles.rightButton} onPress={() => changeImage('right')}/>
          <View style={styles.titleContainer} >
            <Text
              style={styles.title}
              numberOfLines={3}
              onPress={navigateToClubDetails}
            >
              { titre ? titre.toUpperCase() : "Non renseigné" }
            </Text>
            <Pressable onPress={navigateToClubDetails}>
              <Ionicons name="md-information-circle-sharp" size={36} color={colors.primary} style={styles.profileIcon} />
            </Pressable>
          </View>

          <Text style={{color: 'white'}}>
            <Ionicons name="location-sharp" size={14} color={colors.primary} style={styles.locationIcon} /> {formattedDistance ? formattedDistance : 'Non renseigné'} - ({codepostal_actuel})
          </Text>

          <LinearGradient end={{x: 0.3, y: 0.4}} start={{x: 0.8, y: 0.9}} colors={['#000000', '#222222']} style={styles.tagGradient}>
          <Text
            numberOfLines={1}
            style={styles.subCategoryText}
            onPress={navigateToClubDetails}
          >
            {subCategory!= "" ? subCategory : 'Autre/Non renseigné'}
          </Text>
          </LinearGradient>

          <Text
            style={styles.object}
            numberOfLines={3}
            onPress={navigateToClubDetails}
          >
            {objet ? objet?.charAt(0).toUpperCase() + objet?.slice(1) : "Cette association n'a pas renseigné de description"}
          </Text>
        </View>

        {/* Like button */}
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Pressable onPress={handleLike}>
            <AntIcons name={isLiked ? "heart" : "hearto"} size={25} color={colors.primary} style={{textAlign: 'center', paddingBottom: 15}} />
          </Pressable>
        </View>
        <Text style={{color: colors.dark, position: 'absolute', bottom: 15, right: 15, fontSize: 12}} onPress={navigateToClubDetails}>Non revendiqué</Text>

      </LinearGradient>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      maxHeight: "90%",
      borderRadius: 10,
    },
    card: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderRadius: 10,
      overflow: 'hidden',
      maxHeight: "90%",
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
      borderBottomWidth: 0.8,
      borderBottomColor: 'white',
      borderStyle: 'solid',
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
      fontSize: fonts.size.xlg,
      fontWeight: fonts.weight.bold as 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.30)',
      textShadowOffset: {width: 2, height: 3},
      textShadowRadius: 7,
      width: '80%',
    },
    locationIcon: {
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.30)',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 7
    },
    object: {
      fontSize: fonts.size.default,
      color: colors.white,
      paddingHorizontal: 5,
    },
    subCategory: {
      color: 'white',
      borderWidth: 2,
      borderColor: 'white',
      padding: 8,
      paddingHorizontal: 16,
      marginVertical: 4,
      borderRadius: 20,
      backgroundColor: colors.primary,
      overflow: 'hidden'
    },
    subCategoryText: {
      color: 'white',
      paddingHorizontal: 10,
      marginVertical: 4,
      borderRadius: 14,
      backgroundColor: 'transparent',
      overflow: 'hidden',
    },
    profileIcon: {
      textAlign: 'center',
      textShadowColor: 'rgba(30, 30, 50, 0.99)',
      textShadowOffset: {width: 0.5, height: 0.5},
      textShadowRadius: 5,
    },
    tagGradient: {
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "#555555",
      marginVertical: 5
    },
  });

export default ClubCard;
