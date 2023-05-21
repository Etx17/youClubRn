import { View, Text,StyleSheet, Dimensions } from 'react-native'
import React, { useCallback, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
import LikedClubCard from '../../components/LikedClubCard';

type Club = {
  fields: {
    id: string;
    titre: string;
    domaine_activite_libelle_categorise: string;
    objet?: string;
  };
};

const parseClubs = (clubs: string | null):  Club[] => clubs == null ? [] : JSON.parse(clubs);

const LikedClubsIndexScreen = () => {
  const [likedClubs, setLikedClubs] = useState<Club[] | null>([]);
  useFocusEffect(
      React.useCallback(() => {
        const getLikedClubs = async () => {
          try {
            let data = await AsyncStorage.getItem('likedClubs');
            data = data == null ? [] as Club[] : JSON.parse(data);
            setLikedClubs(data)
          } catch (e) {
            console.log(e)
          }
        }
        getLikedClubs();
      }, [])
    );

    const handleUnLike = useCallback(async (clubId: string) => {
      try {
        const clubs = parseClubs(await AsyncStorage.getItem('likedClubs'));
        const index = clubs.findIndex((club: { fields: { id: string | number}}) => club.fields.id === clubId);
        
        const newClubs = [...clubs.slice(0, index), ...clubs.slice(index + 1)];
        await AsyncStorage.setItem('likedClubs', JSON.stringify(newClubs));
        setLikedClubs(newClubs);
      } catch (error) {
        console.error(error);
      }
    }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.headerTitle}>VOS CLUBS FAVORIS</Text>
        <View style={{ height: '90%', width: Dimensions.get("screen").width }}>
          <FlashList
            data={likedClubs}
            keyExtractor={(item: any) => item?.fields?.id.toString()}
            renderItem={({ item }) => <LikedClubCard club={item} onUnLike={handleUnLike} />}
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
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default LikedClubsIndexScreen;
