import { View, Text, ScrollView, Alert, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { useAuthContext } from '../../contexts/AuthContext'
import { useQuery } from '@apollo/client';
import { GET_CLUB_BY_USER_ID } from './queries';
import ApiErrorMessage from '../../components/apiErrorMessage/ApiErrorMessage';
import { Storage } from 'aws-amplify';
import categoryImages from '../../assets/data/categoryImages';
const OwnerClubDetailsScreen = () => {
  const changeImage = (direction: String) => {
    if (direction === 'left') {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)

    } else {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)

    }
  }
  const darkTheme = false
  const navigation = useNavigation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { user } = useAuthContext();
  const {data, loading, error, refetch} = useQuery(GET_CLUB_BY_USER_ID, { variables: {userId: user.id} })
  const name = data?.clubByUserId ? data?.clubByUserId.name : clubs[0].name
  const address = data?.clubByUserId ? data?.clubByUserId.address : clubs[0].address
  const actualZipcode = data?.clubByUserId ? data?.clubByUserId.actualZipcode : clubs[0].actualZipcode
  const activities = data?.clubByUserId ? data?.clubByUserId.activities : clubs[0].activities
  const objet = data?.clubByUserId ? data?.clubByUserId.objet : clubs[0].objet
  const [images, setImages] = useState([]);
  const clubId = data?.clubByUserId.id

  const category = data?.clubByUserId ? data?.clubByUserId.category : clubs[0].category
  const subcategory = data?.clubByUserId ? data?.clubByUserId.subcategory : clubs[0].subcategory
  const categoryImage = categoryImages[category] ? categoryImages[category][subcategory][0] : 'random'

  const default_image = [
    `https://source.unsplash.com/random/?${categoryImage}/300/200`
  ];

  useEffect(() => {
    if (data?.clubByUserId?.images) {
      Promise.all(
        data.clubByUserId.images.map((imageKey) => Storage.get(imageKey))
      )
        .then((fetchedImages) => {
          setImages(fetchedImages);
        })
        .catch((error) => {
          console.error('Error fetching images', error);
        });
    }
  }, [data]);

  if(loading){ return <ActivityIndicator/> }
  if(error){
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error?.message || 'User not found'}
        onRetry={()=>refetch()}
      />
      )
    }
    return (
      <ScrollView style={{backgroundColor: 'black'}}>
      {/* IMAGE CAROUSEL */}

      <DetailsCarousel
        images={images.length > 0 ? images : default_image}
        currentImageIndex={currentImageIndex}
        changeImage={changeImage}
      />

      


      <View style={styles.contentContainer}>
        <Pressable onPress={() => navigation.navigate('EditClub', {clubData: data?.clubByUserId, images})} style={styles.stickyButton}>
          <Entypo name="edit" size={20} color="black" />
        </Pressable>
        <TitleSection title={name} noBackButton />

        <AddressDetails address={address} postalCode={actualZipcode} />

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
                <Pressable onPress={()=> navigation.navigate(
                  'ActivityDetails', {
                    activityId: activity.id,
                    onActivityDeleted: () => refetch()
                  }
                )
                }>
                  <Text key={index}>
                    {activity.name}
                  </Text>
                </Pressable>
              </LinearGradient>
            ))}
            <Pressable onPress={() => navigation.navigate('NewActivity', {refetchClubData: refetch, clubId: clubId})} style={styles.addActivityButton}>
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
