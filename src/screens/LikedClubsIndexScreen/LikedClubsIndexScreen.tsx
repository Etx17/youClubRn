import { View, Text, Alert, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-deck-swiper';
import ClubCard from '../../components/ClubCard';
import AntIcons from '@expo/vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';

const LikedClubsIndexScreen = () => {
  // Get liked clubs from async storage
  // Display liked clubs
  // If no liked clubs, display message
  const [likedClubs, setLikedClubs] = useState([])
//   useEffect(() => {
//     // Get liked clubs from async storage
//     const getLikedClubs = async () => {
//         try {
//           let data = await AsyncStorage.getItem('likedClubs');
//           data = data == null ? [] : JSON.parse(data);
//           setLikedClubs(data)
//         } catch (e) {
//           console.log(e)
//         }
//       }
//       getLikedClubs()
//   }, [])
useFocusEffect(
    React.useCallback(() => {
      const getLikedClubs = async () => {
        try {
          let data = await AsyncStorage.getItem('likedClubs');
          data = data == null ? [] : JSON.parse(data);
          setLikedClubs(data)
        } catch (e) {
          console.log(e)
        }
      }
      getLikedClubs();
    }, [])
  );
  
  console.log(likedClubs.length, '<= number of liked clubs')
  const clearLikedClubs = async () => {
    try {
      await AsyncStorage.setItem('likedClubs', JSON.stringify([]));
      console.log('Liked clubs have been cleared.');
    } catch (error) {
      console.error('Error clearing liked clubs', error);
    }
  };

  return (
    <View>
        {/* <Pressable onPress={clearLikedClubs}>
            <AntIcons name="arrowright" size={40} color='red' style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />
        </Pressable> */}
     {/* Flatlist to render club.adresse_actuelle */}
         {likedClubs.length > 0 && 
        <Swiper
        cards={likedClubs}
        infinite={true}
        stackSize={2}
        cardIndex={0}
        animateOverlayLabelsOpacity
        animateCardOpacity
        key={likedClubs.length } // Important for pagination i heard?
        backgroundColor={'transparent'}
        cardHorizontalMargin={5}
        onSwipedAll={()=>Alert.alert('No more clubs')} //useful later for pagination
        renderCard={(card, cardIndex) => 
          (
          <ClubCard
            data={card}
          />
        )}
      />
    } 
    </View>
  )
}
export default LikedClubsIndexScreen;