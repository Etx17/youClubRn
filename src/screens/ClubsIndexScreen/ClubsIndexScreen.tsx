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

const fetchData = async (dropdownValue: string, city: string) => {
  try {
    let encodedDropdownValue = encodeURIComponent(dropdownValue).replace(/'/g, dropdownValue === "culture, pratiques d'activités artistiques, culturelles" ? "%E2%80%99" : "%27");
    const encodedDropdownValueSpaceIntoPlus = encodedDropdownValue.replace(/%20/g, "+");
    const url = `${BASE_URL}&refine.domaine_activite_libelle_categorise=${encodedDropdownValueSpaceIntoPlus}&refine.localisation_facette=%C3%8Ele-de-France%2F${city === "Mountain View" ? "Paris" : city}&exclude.objet=%22%22&exclude.domaine_activite_libelle_categorise=%22%22&`;
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
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [subCategoryClubs, setSubCategoryClubs] = useState<IClub[]>([]);
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const [isFetching, setIsFetching] = useState(false);
  const {city} = useLocationContext();

  useEffect(() => {
    if (!isFetching && city) {
      setIsFetching(true);
      fetchData(dropdownValue, city).then(data => {
        const filteredClubs = filterClubs(data);
        setClubs(filteredClubs);
        setSubCategoryClubs(filteredClubs);
        setIsFetching(false);
      }).catch(error => {
        console.error('Error fetching data:', error);
        setIsFetching(false);
        Alert.alert('Error fetching data');
      });
    }
  }, [dropdownValue, city]);

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
        renderCard={(card, cardIndex) =>
          (
          <ClubCard
            data={card}
          />
        )}
      />
      ) :  (
        <View style={styles.loading}>

        { city ? (
          <Text >Aucun club trouvé.</Text>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        </View>
      )
    }
      <StatusBar style="auto" />
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
  }
})


export default ClubsIndexScreen
