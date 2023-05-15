import { View, Text, Alert, Pressable, StyleSheet, Dimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-deck-swiper';
import ClubCard from '../../components/ClubCard';
import AntIcons from '@expo/vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../themes/colors';
import { FlashList } from "@shopify/flash-list";
import LikedClubCard from '../../components/LikedClubCard';

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

  const handleUnLike = async (clubId) => {
    try {
      let clubs = await AsyncStorage.getItem('likedClubs');
      clubs = clubs == null ? [] : JSON.parse(clubs);
      const index = clubs.findIndex(club => club.id === clubId);
      if (index !== -1) {
        clubs.splice(index, 1);
        await AsyncStorage.setItem('likedClubs', JSON.stringify(clubs));
        setLikedClubs(clubs);
      }
    } catch (error) {
      console.error(error);
    }
  }


  // const clearLikedClubs = async () => {
  //   try {
  //     await AsyncStorage.setItem('likedClubs', JSON.stringify([]));
  //     console.log('Liked clubs have been cleared.');
  //   } catch (error) {
  //     console.error('Error clearing liked clubs', error);
  //   }
  // };
console.log(likedClubs.length, 'this is liked clubs length')
  return (
    <View style={styles.container}>
        <Text style={styles.headerTitle}>VOS <Text style={{color: colors.primary}}>CLUBS</Text> FAVORIS</Text>
        <View style={{ height: '90%', width: Dimensions.get("screen").width }}>
          <FlashList
            data={likedClubs}
            keyExtractor={(item: any) => item?.fields?.id.toString()}
            renderItem={({ item }) => <LikedClubCard club={item} onUnLike={handleUnLike} />}
            // ListHeaderComponent={ListHeaderComponent}
            estimatedItemSize={20}
          />
        </View>
    
    </View>
  )
}
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default LikedClubsIndexScreen;