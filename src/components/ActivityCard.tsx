import React, {useEffect, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
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
import { Storage } from 'aws-amplify';

interface IActivity {
  id: string,
}
interface IActivityCardProps {
  data: any
}
const activityCard = ({data}: IActivityCardProps) => {

  const [images, setImages] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation();
  const {lat, lon} = useLocationContext()

  const activityLat = parseFloat(data?.geoPoint?.split(',')[0])
  const activityLon = parseFloat(data?.geoPoint?.split(',')[1])
  const distance = getDistance(lat, lon, activityLat, activityLon )
  const formattedDistance = distance.toFixed(1).toString() + ' km';

  const category =  data?.category || 'Autre/Non renseigné';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const subcategories = data?.subcategories?.split('###')[0] || 'Autre/Non renseigné';

  const default_images = [
    `https://source.unsplash.com/random/?${categoryImages[category] ? categoryImages[category][subcategories][0] : 'random'}/300/200`,
  ];
  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const navigateToActivityDetails = () => {
    navigation.navigate('ActivityDetails', {activityData: data, images, darkTheme: true});
    // Alert.alert('Désolé, cette fonctionnalité n\'est pas encore disponible')
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
        const likedActivitiesString = await AsyncStorage.getItem('likedActivities');
        let likedActivities = likedActivitiesString == null ? [] : JSON.parse(likedActivitiesString);
        const index = likedActivities.findIndex((activity: IActivity) => activity.id === data.id);
        if(index !== -1) {
            likedActivities.splice(index, 1);
            setIsLiked(false);
        } else {
            likedActivities.push(data);
            setIsLiked(true);
        }
        await AsyncStorage.setItem('likedActivities', JSON.stringify(likedActivities));
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    const checkIfLiked = async () => {
        try {
            const likedActivitiesString = await AsyncStorage.getItem('likedActivities');
            let likedActivities = likedActivitiesString == null ? [] : JSON.parse(likedActivitiesString);
            const index = likedActivities?.findIndex((activity: IActivity) => activity.id === data.id);
            setIsLiked(index !== -1); // If index is not found, its value is -1, so the activity is not liked since it would be false
        } catch (error) {
            console.error(error);
        }
    };
    checkIfLiked();
  }, []);

  useEffect(() => {
    if (data?.images.length > 0 ) {
      Promise.all(
        data.images.map((imageKey) => Storage.get(imageKey, {level: 'public'}))
      )
        .then((fetchedImages) => {
          setImages(fetchedImages);
        })
        .catch((error) => {
          console.error('Error fetching images', error);
        });
    } else {
      setImages(default_images)
    }
  }, [data]);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <Image
        style={styles.image}
        source={{uri: images[0]}}
        contentFit="cover"
        transition={0}
        placeholder={blurhash}
      />
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
              numberOfLines={1}
              onPress={navigateToActivityDetails}
            >
              { data?.name }
            </Text>
            <Pressable onPress={navigateToActivityDetails}>
              <Ionicons name="md-information-circle-sharp" size={36} color={colors.primary} style={styles.profileIcon} />
            </Pressable>
          </View>

          <View style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: colors.grayDarkest}}>
          par { data?.club.name.substring(0, 30) }{data?.club.name.length > 30 ? '...' : ''}
          </Text>
          <Text style={{color: 'white'}}>
            <Ionicons name="location-sharp" size={14} color={colors.primary} style={styles.locationIcon} /> {formattedDistance ? formattedDistance : 'Non renseigné'} - {data?.actual_zipcode}
          </Text>

          </View>

          <LinearGradient end={{x: 0.3, y: 0.4}} start={{x: 0.8, y: 0.9}} colors={['#000000', '#222222']} style={styles.tagGradient}>


            {/* tags concernant les sous groupes  */}
          <Text
            numberOfLines={1}
            style={styles.subCategoryText}
            onPress={navigateToActivityDetails}
          >
            {data?.subcategories!= "" ? data?.subcategories : 'Autre/Non renseigné'}
          </Text>


          </LinearGradient>

          <Text
            style={styles.object}
            numberOfLines={2}
            onPress={navigateToActivityDetails}
          >
            {data?.shortDescription ? data?.shortDescription?.charAt(0).toUpperCase() + data?.shortDescription?.slice(1) : "L'activité n'a pas de description"}
          </Text>
        </View>

        {/* Like button */}
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Pressable onPress={handleLike}>
            <AntIcons name={isLiked ? "heart" : "hearto"} size={25} color={colors.primary} style={{textAlign: 'center', paddingBottom: 15}} />
          </Pressable>
        </View>
        <Text style={{color: colors.dark, position: 'absolute', bottom: 15, left: 20, fontSize: 12}} onPress={navigateToActivityDetails}>Essai gratuit</Text>

        <View style={{display: 'flex', flexDirection: 'row',}}>
          <Text style={{color: colors.primary, position: 'absolute', bottom: 15, right: 20, fontSize: 12}} onPress={navigateToActivityDetails}><Ionicons name="checkmark-circle-outline" color={colors.primary} size={13}> Essai gratuit</Ionicons></Text>
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
      fontSize: fonts.size.xxlg,
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
      color: colors.grayDarkest,
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

export default activityCard;
