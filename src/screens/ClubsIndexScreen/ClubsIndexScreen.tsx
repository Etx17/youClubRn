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

interface IClub {
  fields: {
    objet: string;
    domaine_activite_libelle_categorise: string;
  }
}

interface Data {
  records: IClub[];
}

const BASE_URL = 'https://journal-officiel-datadila.opendatasoft.com/api/records/1.0/search/?dataset=jo_associations&q=&rows=2000&sort=dateparution&facet=lieu_declaration_facette&facet=domaine_activite_categorise&facet=domaine_activite_libelle_categorise';

const fetchData = async (dropdownValue: string, city: string, region: string, subregion: string) => {

  try {
    let encodedDropdownValue = encodeURIComponent(dropdownValue).replace(/'/g, dropdownValue === "culture, pratiques d'activités artistiques, culturelles" ? "%E2%80%99" : "%27");
    const encodedDropdownValueSpaceIntoPlus = encodedDropdownValue.replace(/%20/g, "+");
    const [encodedRegion, encodedCity, encodedSubRegion] = [encodeURIComponent(region), encodeURIComponent(city), encodeURIComponent(subregion)];
    const url = `${BASE_URL}&refine.domaine_activite_libelle_categorise=${encodedDropdownValueSpaceIntoPlus}&refine.localisation_facette=${(region === "California" || region === "CA") ? "%C3%8Ele-de-France" : encodedRegion }%2F${(encodedCity === "Mountain%20View" || encodedCity === "San%20Francisco" || encodedSubRegion ==='D%C3%A9partement%20de%20Paris') ? "Paris" : encodedSubRegion}&exclude.objet=%22%22&exclude.domaine_activite_libelle_categorise=%22%22&`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const filterClubs = (data: Data): IClub[] => {
  return data?.records.filter(club => {
    const { objet, domaine_activite_libelle_categorise } = club?.fields || {};
    const [subCategory] = domaine_activite_libelle_categorise?.split('/')[1]?.split('###') || [];
    return objet?.trim() && subCategory?.trim();
  });
};

const ClubsIndexScreen = () => {

  // Je dois recharger la page lorsque j'obtiens l'autorisation d'utiliser données de géolocalisation
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [subCategoryClubs, setSubCategoryClubs] = useState<IClub[]>([]);
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const [isFetching, setIsFetching] = useState(false);
  const { zipcode, city, region, subregion, allowLocation } = useLocationContext();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    // console.log('Fetching data...');
    // console.log('city=>', city, 'subregion =>', subregion, ' <= useEffect from ClubIndexScreen');
    const startTime = new Date().getTime();

    if ((!isFetching && city && region && subregion) || reload && subregion) {
      setReload(false);
      setIsFetching(true);
      fetchData(dropdownValue, city, region, subregion).then(data => {
        const filteredClubs = filterClubs(data);
        setClubs(filteredClubs);
        setSubCategoryClubs(filteredClubs);
        setIsFetching(false);

        const endTime = new Date().getTime();
        const elapsedTime = endTime - startTime;
        // console.log('Fetched data in', elapsedTime, 'milliseconds');

      }).catch(error => {
        console.error('Error fetching data:', error);
        setIsFetching(false);
        Alert.alert('Error fetching data');
      });
    }
  }, [allowLocation, dropdownValue, subregion, reload]);

  const handleDropdownValueChange = (valuecat: string) => {
    setDropdownValue(valuecat);
  };

  const handleSubCategoryDropdownValueChange = (valuesub: string) => {
    if (valuesub === 'all' || !valuesub) {
      return setSubCategoryClubs(clubs);
    } else {
      setSubCategoryDropdownValue(valuesub);
      const newClubs = clubs.filter((club) => club?.fields?.domaine_activite_libelle_categorise.split('/')[1]?.split("###")[0] === valuesub);
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
        stackSize={1}
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
