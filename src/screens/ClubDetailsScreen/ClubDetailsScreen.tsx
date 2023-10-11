import React, {useEffect, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, Pressable, ScrollView, Linking, ActivityIndicator } from 'react-native'
import {Image} from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import colors from '../../themes/colors'
import { Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import DetailsCarousel from '../../components/DetailsCarousel'
import ActivitiesSection from '../../components/ActivitiesSection'
import AssociationLink from '../../components/AssociationLink'
import AddressDetails from '../../components/AddressDetails'
import InscriptionButton from '../../components/InscriptionButton'
import DescriptionSection from '../../components/DescriptionSection'
import TitleSection from '../../components/TitleSection'
import { useQuery } from '@apollo/client'
import { GET_ACTIVITIES_BY_CLUB_ID } from './queries'

interface ClubDetailsParams {
  clubData: {
    id: string;
    name: string;
    objet: string;
    address: string;
    actualZipcode: string;
    domaine_activite_libelle_categorise: string;
  };
  images: string[];
  darkTheme?: boolean;
}

type Activity = {
  name: string;
  id: string;
}

type ClubDetailsRoute = RouteProp<Record<string, ClubDetailsParams>, string>;

const ClubDetailsScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<ClubDetailsRoute>();
  const { name, objet, address, actualZipcode, id } = route?.params?.clubData
  const {images, darkTheme} = route?.params
  const [activities, setActivities] = useState<[Activity]>([{name: '', id: ''}])
  const formattedObject = objet.split(';').map(sentence => sentence.trim().charAt(0).toUpperCase() + sentence.trim().slice(1)).join('. \n\n')

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { data, loading, error } = useQuery(GET_ACTIVITIES_BY_CLUB_ID, {
    variables: { clubId: id },
    skip: !id
  });

  useEffect(()=> {
    if(data?.activitiesByClubId) {
      setActivities(data.activitiesByClubId)
    }
  }, [data])

  const changeImage = (direction: String) => {
    if (direction === 'left') {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)

    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)

    }
  }


  // useEffect(()  => {
  //   if(route?.params?.clubData)

  // }, [data])

  return (
    <ScrollView>
      {/* IMAGE CAROUSEL */}
      <DetailsCarousel images={images} currentImageIndex={currentImageIndex} changeImage={changeImage} />

      <View style={styles.contentContainer}>

        <TitleSection title={name} onButtonPress={() => navigation.goBack()} />

        <AddressDetails address={address} postalCode={actualZipcode} />

        <AssociationLink />

        { loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (<ActivitiesSection activities={activities} />)}

        <DescriptionSection description={formattedObject} />

        <InscriptionButton onPress={() => Alert.alert("Bientôt disponible", "Lorsque cette association aura récupéré son profil, elle pourra mettre en place l'inscription")} />

      </View>

      <LinearGradient colors={[darkTheme === true ? colors.dark : 'transparent', 'transparent']} style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 120, }} />

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
    position: 'absolute',
    top: 70,
    left: 10,
    backgroundColor: colors.primary,
    borderRadius: 25,
    padding: 10,
    zIndex: 2,
    elevation: 8,
  },
  stickyButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
})

export default ClubDetailsScreen
