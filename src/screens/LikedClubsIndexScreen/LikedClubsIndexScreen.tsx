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
  const [likedClubs, setLikedClubs] = useState([])
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

  const handleUnLike = async (clubId: string) => {
    try {
      let clubs = await AsyncStorage.getItem('likedClubs');
      clubs = clubs == null ? [] : JSON.parse(clubs);
      const index = clubs?.findIndex(club => club.fields.id === clubId);
      if (index !== -1) {
        clubs?.splice(index, 1);
        await AsyncStorage.setItem('likedClubs', JSON.stringify(clubs));
        setLikedClubs(clubs);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.headerTitle}>VOS CLUBS FAVORIS</Text>
        <View style={{ height: '90%', width: Dimensions.get("screen").width,
 }}>
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
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default LikedClubsIndexScreen;
