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




const ClubsIndexScreen = () => {
  const [clubs, setClubs] = useState([]);
  const [subCategoryClubs, setSubCategoryClubs] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const [isFetching, setIsFetching] = useState(false);
  const {city} = useLocationContext();
  const fetchData = async () => {
    try {
      let encodedDropdownValue
      console.log(dropdownValue, "dropdownValue")
      if (dropdownValue === "culture, pratiques d'activités artistiques, culturelles"){
        encodedDropdownValue = encodeURIComponent(dropdownValue).replace(/'/g, "%E2%80%99");
      } else {
        encodedDropdownValue = encodeURIComponent(dropdownValue).replace(/'/g, "%27");
      }
      const encodedDropdownValueSpaceIntoPlus = encodedDropdownValue.replace(/%20/g, "+");
      console.log("encodedDropdownValue", encodedDropdownValueSpaceIntoPlus);
      const url = `https://journal-officiel-datadila.opendatasoft.com/api/records/1.0/search/?dataset=jo_associations&q=&rows=2000&sort=dateparution&facet=lieu_declaration_facette&facet=domaine_activite_categorise&facet=domaine_activite_libelle_categorise&refine.domaine_activite_libelle_categorise=${encodedDropdownValueSpaceIntoPlus}&refine.localisation_facette=%C3%8Ele-de-France%2F${city === "Mountain View" ? "Paris" : city}&exclude.objet=%22%22&exclude.domaine_activite_libelle_categorise=%22%22&`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {

    const fetchClubs = async () => {
      if (isFetching) {
        console.log('Already fetching clubs so it had to RETURN')
        return; 
      }

      if (!city) {
        console.log('city is falsy so it had to RETURN')
        setIsFetching(false);
        return;
      }

      setIsFetching(true);
      try {
        const data = await fetchData();
        console.log(data?.records.length, 'this is data records length');

        const clubsWithObjectAndSubcategory =
          data?.records.filter(
            (club: {fields: {objet: any, domaine_activite_libelle_categorise: string}}) => club?.fields?.objet
              && club?.fields?.objet.trim() !== ""
              && club?.fields?.domaine_activite_libelle_categorise.split('/')[1].split('###')[0]
              && club?.fields?.domaine_activite_libelle_categorise.split('/')[1].split('###')[0].trim() !== ""
          );
        console.log(clubsWithObjectAndSubcategory.length, 'this is clubsWithObjectAndSubcategory.length after ');
        setClubs(clubsWithObjectAndSubcategory);
        setSubCategoryClubs(clubsWithObjectAndSubcategory);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchClubs();

  }, [dropdownValue, city])

  const handleDropdownValueChange = (valuecat: any) => {
    setDropdownValue(valuecat);
  };
  const handleSubCategoryDropdownValueChange = (valuesub: any) => {
    if (valuesub === 'all' || null || undefined) {
      return setSubCategoryClubs(clubs);
    } else {
      setSubCategoryDropdownValue(valuesub);

    if(clubs.length > 0){
      const newClubs = clubs.filter((club: { fields: { domaine_activite_libelle_categorise: string}}) => club?.fields?.domaine_activite_libelle_categorise.split('/')[1].split("###")[0] === valuesub);
      setSubCategoryClubs(newClubs);
      } else {
        setIsFetching(false)
      }
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
        key={subCategoryClubs.length } // Important for pagination i heard?
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
