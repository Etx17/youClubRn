import React, {useState} from 'react'
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

interface IClub {
  id: number;
  titre: string;
  rna_number: string;
  geo_point: string;
  objet: string;
  category: string;
  subcategory: string;
  images: [string]
  codepostal_actuel: string;
  adresse_actuelle: string;
}
interface IClubCardProps {
  data: any
}
const ClubCard = ({data}: IClubCardProps) => {
    const navigation = useNavigation();
    const {lat, lon} = useLocationContext()
    // console.log(lat, lon, 'this is lat and lon of user')
    // console.log(data, "this is data fields")
    const clubLat = parseFloat(data?.fields?.geo_point?.split(',')[0])
    const clubLon = parseFloat(data?.fields?.geo_point?.split(',')[1])
    const distance = getDistance(lat, lon, clubLat, clubLon )
    const formattedDistance = distance.toFixed(1).toString() + ' km';
    const titre = data?.fields?.titre || "Cette association n'a pas renseigné de titre"
    const objet = data?.fields?.objet || "Cette association n'a pas renseigné de description";
    const domaine_activite_libelle_categorise = data?.fields?.domaine_activite_libelle_categorise;
    const codepostal_actuel = data?.fields?.codepostal_actuel;
    // console.log(domaine_activite_libelle_categorise, 'data.fields.domaine_activite_libelle_categorise before split')
    const subCategory = domaine_activite_libelle_categorise ? domaine_activite_libelle_categorise.split('/')[1].split('###')[0].charAt(0).toUpperCase() + domaine_activite_libelle_categorise.split('/')[1].split('###')[0].slice(1) : 'Autre/Non renseigné';
    const category = domaine_activite_libelle_categorise ? domaine_activite_libelle_categorise.split('/')[0].split('###')[0].charAt(0).toUpperCase() + domaine_activite_libelle_categorise.split('/')[0].split('###')[0].slice(1) : 'Autre/Non renseigné';
    // console.log(titre, ' =>>>> we have a title');
    // console.log(objet, ' =>>>> we have an object')
    // console.log(codepostal_actuel, ' =>>>> we have a code postal');
    // console.log(domaine_activite_libelle_categorise, ' =>>>> we have a category');
    // console.log(category, '=>>>> we have a category name formatted');
    // console.log(subCategory, '=>>>> we have a subcategory');
    console.log(categoryImages[category])
    if (categoryImages[category]) {
    console.log(categoryImages[category][subCategory] , ' =>>>> we have a category image');
    }
    
    
    const images = [
    `https://source.unsplash.com/random/?${categoryImages[category] ? categoryImages[category][subCategory][0] : 'random'}`,
    `https://source.unsplash.com/random/?${categoryImages[category] ? categoryImages[category][subCategory][1] : 'random'}`,
    `https://source.unsplash.com/random/?${categoryImages[category] ? categoryImages[category][subCategory][2] : 'random'}` // Mettre une autre carte pour renseigner l'email
  ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const changeImage = (direction: String) => {
      if (direction === 'left') {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      } else {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    };
    // console.log(data?.fields)
  return (
    <View style={styles.container}>
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
          <Text style={styles.title} numberOfLines={3}>{ titre ? titre.toUpperCase() : "Non renseigné"}</Text>
          <Pressable onPress={() => navigation.navigate('ClubDetails', {clubData: data.fields, images})}>
            <AntIcons name="arrowright" size={40} color={colors.primaryLight} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />
          </Pressable>
        </View>

        {/* Localisation */}
        <Text style={{color: 'white'}}>
          <Ionicons name="location-sharp" size={14} color="white" style={styles.locationIcon} />{formattedDistance ? formattedDistance : 'Non renseigné'}
        </Text>
        
        <Text numberOfLines={2} style={{color: 'white', borderWidth: 2, borderColor: 'white', padding: 8, paddingHorizontal: 16, marginVertical: 4, borderRadius: 20, backgroundColor: colors.primary, overflow: 'hidden'}}>
          {subCategory!= "" ? subCategory : 'Autre/Non renseigné'}
        </Text> 
        
        

        {/* Description */}
        <Text style={styles.object} numberOfLines={3}>{objet ? objet?.charAt(0).toUpperCase() + objet?.slice(1) : "Cette association n'a pas renseigné de description"}</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <Pressable onPress={() => console.log('clicked phone button')}>
          <AntIcons name="phone" size={20} color="white" style={{textAlign: 'center', paddingBottom: 15}} />
        </Pressable>
        <Pressable onPress={() => console.log('clicked liked button')}>
          <AntIcons name="hearto" size={20} color="white" style={{textAlign: 'center', paddingBottom: 15}} />
        </Pressable>
      </View>
    </LinearGradient>
  </View>
  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      maxHeight: "90%",
      // borderBottomWidth: 0.8,
      // borderBottomColor: 'lightgrey',
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
      // alignSelf: 'auto',
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
  });

export default ClubCard;