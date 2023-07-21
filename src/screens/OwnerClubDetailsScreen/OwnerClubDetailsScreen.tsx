import { View, Text, ScrollView, Alert, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import clubs from '../../assets/data/clubs'
import Ionicons from '@expo/vector-icons/Ionicons';
import DetailsCarousel from '../../components/DetailsCarousel'
import TitleSection from '../../components/TitleSection'
import AddressDetails from '../../components/AddressDetails'
import { Entypo } from '@expo/vector-icons'; 
import DescriptionSection from '../../components/DescriptionSection'
import InscriptionButton from '../../components/InscriptionButton'
import colors from '../../themes/colors'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const OwnerClubDetailsScreen = () => {
  const navigation = useNavigation()
  const { name, objet, address, actual_zipcode, subcategory, images, activities } = clubs[0]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const darkTheme = false
  const changeImage = (direction: String) => {
    if (direction === 'left') {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)

    } else {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)

    }
  }

    return (
      <ScrollView>
      {/* IMAGE CAROUSEL */}
      <DetailsCarousel images={images} currentImageIndex={currentImageIndex} changeImage={changeImage} />

      <View style={styles.contentContainer}>

        <Pressable onPress={() => navigation.navigate('EditClub')} style={styles.stickyButton}>
          <Entypo name="edit" size={20} color="black" />
        </Pressable>
        <TitleSection title={name} noBackButton />

        <AddressDetails address={address} postalCode={actual_zipcode} />

        {/* Activity section, to export in a component later. */}
        <View>
          <Text style={{ color: colors.grayDark, fontWeight: 'bold', marginTop: 10 }}>ACTIVITÉS:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            {activities.map((activity, index: number) => (
              <LinearGradient 
                key={`${activity.id}_${index}`}
                start={[0, 0]} 
                end={[1, 0]} 
                colors={[colors.secondary, colors.primary] } 
                style={styles.tag}
              > 
                <Pressable onPress={()=> navigation.navigate('ActivityDetails', {activityData: activity})}>
                  <Text key={index}>
                    {activity.name}
                  </Text>
                </Pressable>
              </LinearGradient>
            ))}
            <Pressable onPress={() => navigation.navigate('NewActivity', {clubId: '1'})} style={styles.addActivityButton}>
                <Ionicons name='add-outline' size={20} color={colors.primary} />
            </Pressable>
            
          </View>
        </View>

        <DescriptionSection description={objet} />

      </View>

      <LinearGradient colors={[darkTheme ? colors.dark : 'transparent', 'transparent']} style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 120, }} />
      
      <StatusBar style={'light'} />

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
    top: -20,  
    right: 20,  
    backgroundColor: colors.primary,  
    borderRadius: 25,  
    padding: 10,
    zIndex: 2,
    elevation: 8,
    borderWidth: 0.8,
  },
  addActivityButton: {
    marginTop: 10,
    fontSize: 14,
    paddingVertical: 0,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: colors.primary,
    borderWidth: 1,
    marginHorizontal: 4,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default OwnerClubDetailsScreen