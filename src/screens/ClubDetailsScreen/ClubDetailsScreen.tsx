import React, {useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, Pressable, ScrollView, Linking } from 'react-native'

// import colors from '../themes/colors'

import {Image} from 'expo-image'

import Ionicons from '@expo/vector-icons/Ionicons'

import AntIcons from '@expo/vector-icons/AntDesign'

// import fonts from '../themes/fonts'

import { useNavigation, useRoute } from '@react-navigation/native'

import colors from '../../themes/colors'
import { Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context'
import categoryImages from '../../assets/data/categoryImages';
  
const ClubDetailsScreen = () => {
  // const {id, title, object, category, subcategory, images, actual_zipcode} = data
  
  const navigation = useNavigation()
  const route = useRoute()

  const {id, titre, objet, adresse_actuelle, codepostal_actuel, domaine_activite_libelle_categorise } = route?.params?.clubData
  const images = route?.params?.images
  const category = domaine_activite_libelle_categorise.split('/')[0]    
  const subcategories = domaine_activite_libelle_categorise.split('/')[1].split('###').map!(word => word.charAt(0).toUpperCase() + word.slice(1)).join('  --  ')
  const formattedObject = objet.split(';').map(sentence => sentence.trim().charAt(0).toUpperCase() + sentence.trim().slice(1)).join('. \n\n')
  
  const activities = domaine_activite_libelle_categorise.split('###').map(element => element.split('/')[1])
  const formattedActivities = activities.map(label => label.charAt(0).toUpperCase() + label.slice(1)).join(' - ')
  console.log(formattedActivities);
  
  
  console.log(domaine_activite_libelle_categorise)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const changeImage = (direction: String) => {
    if (direction === 'left') {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
      
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      
    }
  }
  const insets = useSafeAreaInsets()
  // Trim white spaces at beginning and end of each sentence, then Capitalize first letter of each sentence, and join with a dot
  
  return (
    <ScrollView>
      {/* IMAGE COMPONENT */}
      <View style={styles.informationsContainer}>
      <Pressable style={styles.leftButton} onPress={() => changeImage('left')}/>
      <Pressable style={styles.rightButton} onPress={() => changeImage('right')}/>
      <Image style={styles.image} source={{uri: images[currentImageIndex]}} contentFit="cover" transition={0} />
      <View style={styles.indexButtonContainer}>
      { images.length > 1 && images.map((_, index) => (
        <View
          key={index}
          style={{
            width: `${80 / images.length}%`,
            height: 4,
            backgroundColor: `${ index == currentImageIndex ? 'white' : 'darkgrey' }`,
            margin: 5,
          }}/>)) }
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.contentContainer}>

      {/* Title + button container */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={3}>{titre ? titre : 'Erreur lors de la récupération du titre'}</Text>
          <Pressable onPress={() => navigation.goBack()} style={{borderRadius: 50}}>
            <Ionicons name="chevron-back-outline" size={40} color="white" style={styles.goBackButton} />
          </Pressable>
        </View>

      {/* subtitle container */}
        <View style={styles.subTitle}>
          <Text  onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${adresse_actuelle}`) }>
            <Ionicons name="location-sharp" size={14} color={colors.primary}  /> {adresse_actuelle.substring(0, 30)}...<Text style={{color: colors.info, fontWeight: 'bold'}}>Voir</Text>
          </Text>
          <Text>{codepostal_actuel}</Text>
        </View>

        <Text style={styles.tag}>{subcategories}</Text>
      {/* Full Description */}
        <Text style={styles.object}>{formattedObject}</Text>
          <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
          <Text onPress={() => Alert.alert("Bientôt disponible", "Lorsque cette association aura récupéré son profil, elle pourra mettre en place l'inscription")} style={{color: colors.primary, fontWeight: 'bold'}}>M'inscrire</Text>
        </View>

      </View>
      <StatusBar style="auto" />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "95%",
    borderBottomWidth: 0.8,
    borderBottomColor: 'lightgrey',
    borderRadius: 10,
  },
  image: {
    flex: 1,
    width: '100%',
    aspectRatio: 0.8,
  },
  contentContainer: {
    padding: 15
  },
  informationsContainer: {
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'flex-start',
  },
  leftButton: {
    width: "50%",
    height: "100%",
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  rightButton: {
    width: "50%",
    height: "100%",
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  indexButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 5,
    overflow: 'hidden',
  },
  goBackButton: {
    backgroundColor: colors.primaryLight, 
    borderRadius: 200, 
    width: 45, 
    borderColor: 'white', 
    elevation: 8,
    position: 'absolute', //Here is the trick
    right: 10,
    bottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.dark,
    width: "80%"
  },
  subTitle: {
    fontSize: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  object: {
    fontSize: 14, 
    color: colors.dark,
    paddingVertical: 10,
  },
  tag: {
    marginTop: 10,
    fontSize: 14,
    color: colors.white,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 200,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    backgroundColor: colors.primaryLight,
    width: "auto"
  }
})

export default ClubDetailsScreen