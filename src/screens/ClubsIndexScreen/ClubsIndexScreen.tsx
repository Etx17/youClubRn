import React, { useEffect, useState} from 'react';
import { View, StyleSheet, Text, ActivityIndicator }  from 'react-native';
import ClubCard from '../../components/ClubCard';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';
import Swiper from 'react-native-deck-swiper';
import { StatusBar } from 'expo-status-bar';
import { useLocationContext } from '../../contexts/LocationContext';
import { Alert } from 'react-native';
import axios from 'axios';
import { Pressable } from 'react-native';
import colors from '../../themes/colors';
import { useQuery } from '@apollo/client';
import { GET_CLUBS_BY_ZIPCODE } from './queries';

interface IClub {

  objet: string;
  subcategory: string;
}

interface Data {
  records: IClub[];
}

const ClubsIndexScreen = () => {

  // Je dois recharger la page lorsque j'obtiens l'autorisation d'utiliser données de géolocalisation
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [subCategoryClubs, setSubCategoryClubs] = useState<IClub[]>([]);
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const [isFetching, setIsFetching] = useState(false);
  const { zipcode, city, region, subregion, allowLocation } = useLocationContext();

  const { data, loading, error } = useQuery(GET_CLUBS_BY_ZIPCODE, {
    variables: { actualZipcode: zipcode },
    skip: !zipcode
  });
  const [reload, setReload] = useState(false);


  useEffect(() => {

    if (data?.clubsByZipcode) {
      console.log(data?.clubsByZipcode.length, '<- number of clubs found');
      setClubs(data?.clubsByZipcode);
      setSubCategoryClubs(data?.clubsByZipcode);
    }
    if (error) {
      console.error("GraphQL Error:", error);
    }
  }, [data, error])


  const handleDropdownValueChange = (valuecat: string) => {
    setDropdownValue(valuecat);
  };

  const handleSubCategoryDropdownValueChange = (valuesub: string) => {
    if (valuesub === 'all' || !valuesub) {
      return setSubCategoryClubs(clubs);
    } else {
      setSubCategoryDropdownValue(valuesub);
      const newClubs = clubs.filter((club) => club?.subcategory === valuesub);
      setSubCategoryClubs(newClubs);
    }
  };

  const handleReload = () => {
    setReload(true);
  };

return (

  <View style={styles.container}>

      <View style={styles.dropdownContainer}>
        <Dropdown
          style={{ flex: 1 }}
          valuecat={dropdownValue}
          onValueChange={handleDropdownValueChange}
        />
        <SubCategoryDropdown
          style={{ flex: 1 }}
          valuesub={subCategoryDropdownValue}
          onValueChange={handleSubCategoryDropdownValueChange}
          categoryName={dropdownValue || ''}
        />
      </View>
    { isFetching ? (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      ) : subCategoryClubs.length > 0 ? (
      <Swiper
        cards={subCategoryClubs}
        infinite={true}
        stackSize={2}
        cardIndex={0}
        animateOverlayLabelsOpacity
        animateCardOpacity
        key={subCategoryClubs.length }
        backgroundColor={'transparent'}
        cardHorizontalMargin={5}
        onSwipedAll={()=>Alert.alert('No more clubs')}
        renderCard={(card, cardIndex) => ( <ClubCard key={cardIndex} data={card} /> )}
      />
      ) :  (
        <View style={styles.loading}>

        { city ? (
          <View>
          <Text >Aucun club trouvé.</Text>
          <Pressable style={styles.reloadButton} onPress={handleReload}>
          <Text style={styles.reloadButtonText}>Reload</Text>
          </Pressable>
          </View>
        ) : (
          <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Pressable style={styles.reloadButton} onPress={handleReload}>
          <Text style={styles.reloadButtonText}>Reload</Text>
          </Pressable>
          </View>
        )}
        </View>
      )
    }
      <StatusBar style="dark" />
  </View>

);}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10
  },
  dropdownContainer: {
    zIndex: 3000, // Necessary
    flexDirection: 'row',
    gap: 0,
    marginTop: 1.5,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reloadButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  reloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})


export default ClubsIndexScreen
