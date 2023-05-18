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
  const darkTheme = route?.params?.darkTheme

  const {id, titre, objet, adresse_actuelle, codepostal_actuel, domaine_activite_libelle_categorise } = route?.params?.clubData
  const images = route?.params?.images
  console.log(images, 'this is images');
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
      {/* <Pressable style={styles.stickyButton} onPress={() => Alert.alert("Réclamer mon profil")}>
        <Text style={styles.stickyButtonText}>C'est votre association ?</Text>
      </Pressable> */}
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
            <Ionicons name="chevron-back-outline" size={40} color="black" style={styles.goBackButton} />
          </Pressable>
        </View>

      {/* subtitle container */}
        <View style={styles.subTitle}>
          <Text style={{color: 'white'}} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${adresse_actuelle}`) }>
            <Ionicons name="location-sharp" size={14} color={colors.primary}  /> {adresse_actuelle.substring(0, 30)}...<Text style={{color: colors.info, fontWeight: 'bold'}}>Voir</Text>
          </Text>
          <Text  style={{color: 'white'}}>{codepostal_actuel}</Text>
        </View>

        <Text style={styles.subCategoryTag} onPress={() => {
Linking.openURL('mailto:youclubdev@gmail.com?subject=%5BDemande%20de%20v%C3%A9rification%20de%20profil%20d%27association%5D&body=%2A%2A%2ABonjour%2C%0D%0A%0D%0AVous%20faites%20partie%20des%20premi%C3%A8res%20associations%20%C3%A0%20revendiquer%20leur%20profil.%20La%20v%C3%A9rification%20est%20gratuite%21%20Nous%20avons%20besoin%20de%20:%0D%0A%0D%0A-%20Statuts%2C%20preuves%20d%27enregistrement%20ou%20PV%20de%20r%C3%A9union%20indiquant%20votre%20nomination%2C%0D%0A-%20Pi%C3%A8ce%20d%27identit%C3%A9%20ou%20passeport%2C%0D%0A-%20Num%C3%A9ro%20de%20t%C3%A9l%C3%A9phone%2C%0D%0A-%20Email%20de%20l%27association%2C%0D%0A-%20Num%C3%A9ro%20RNA.%0D%0A%0D%0AApr%C3%A8s%20v%C3%A9rification%2C%20vous%20recevrez%20vos%20identifiants.%20Vous%20pourrez%20modifier%20votre%20profil%20d%C3%A8s%20la%20prochaine%20MAJ.%0D%0A%0D%0AAjoutez%20vos%20infos%20apr%C3%A8s%20ce%20texte.%0D%0A%0D%0ACordialement%2C%0D%0AYouClub%2A%2A%2A');
}}>C'est votre association ? Cliquez ici</Text>

        <Text style={{color: colors.grayDark, fontWeight: 'bold', marginTop: 10}}>ACTIVITÉS:</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
        <Text style={styles.tag}>Activités</Text>
        <Text style={styles.tag}>Bientôt </Text>
        <Text style={styles.tag}>Disponibles</Text>
        <Text style={styles.tag}>Réclamez votre association</Text>
        </View>

      {/* Full Description */}
        <Text style={{color: colors.grayDark, fontWeight: 'bold', marginTop: 10}}>DESCRIPTION:</Text>
        <Text style={styles.object}>{formattedObject}</Text>
        <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
          <Text onPress={() => Alert.alert("Bientôt disponible", "Lorsque cette association aura récupéré son profil, elle pourra mettre en place l'inscription")} style={styles.signUpButton}>M'inscrire</Text>
        </View>


      </View>

      {/*  Si prop darkTheme est passée, color du gradient reste comme déja c'est. Sinon, status bar style auto et gradient transparent transparent */}
      <LinearGradient
        colors={[darkTheme === true ? colors.dark : 'transparent', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 120,
        }}
      />
      <StatusBar style={darkTheme === true ? "light" : 'auto'} />
    </ScrollView>
  )
}

const buttonWidth = 45;
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
    padding: 15,
    backgroundColor: 'black',
    flex: 1,
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
    backgroundColor: colors.primary,
    borderRadius: buttonWidth/2,
    width: buttonWidth,
    borderColor: 'black',
    borderWidth: 1,
    overflow: 'hidden',
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
    color: 'white',
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
    color: colors.grayDarkest,
    paddingVertical: 10,
  },
  subCategoryTag:{
    marginVertical: 0,
    fontSize: 14,
    color: colors.primary,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    width: "auto"
  },
  tag: {
    marginTop: 10,
    fontSize: 14,
    color: colors.dark,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 14,
    overflow: 'hidden',
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: colors.primary,
    width: "auto",
    marginHorizontal: 4,
  },
  signUpButton: {
    // Sticky button at the bottom of the screen
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 8,
  },
  stickyButton: {
    position: 'absolute',  // To overlap the button on the image
    top: 70,  // Adjust this value to move the button vertically
    left: 10,  // Adjust this value to move the button horizontally
    backgroundColor: colors.primary,  // Background color of the button
    borderRadius: 25,  // To make the button rounded
    padding: 10,  // Padding around the text inside the button
    zIndex: 2,  // To make sure the button is above the image
    elevation: 8,  // To give the button a shadow
  },
  stickyButtonText: {
    color: 'black',  // Color of the text inside the button
    fontWeight: 'bold',  // To make the text bold
  },
})

export default ClubDetailsScreen
