import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView, Text, FlatList }  from 'react-native';
import ClubCard from '../../components/ClubCard';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';
import clubs from '../../assets/data/clubs.json';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocationContext } from '../../contexts/LocationContext';
const ClubsIndexScreen = () => {
  const [clubsList, setClubsList] = useState(clubs);
  const {lat, lon} = useLocationContext()
  const [dropdownValue, setDropdownValue] = useState("sports");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");

  const fetchData = async () => {
    const url = 'https://journal-officiel-datadila.opendatasoft.com/api/records/1.0/search/?dataset=jo_associations&q=NOT+objet%3A%22%22&lang=FR&rows=12&sort=dateparution&facet=source&facet=annonce_type_facette&facet=localisation_facette&facet=metadonnees_type_code&facet=lieu_declaration_facette&facet=domaine_activite_categorise&facet=domaine_activite_libelle_categorise&refine.domaine_activite_libelle_categorise=Sports%2C+activit%C3%A9s+de+plein+air&refine.typeavis=Cr%C3%A9ation&refine.commune_actuelle=Paris';

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data.facet_groups[0].facets[0].count, 'There are 5314 associations in the sports category');
      console.log(data.records[0].fields.domaine_activite_libelle_categorise.split('/'), 'this is first record data');
      
      // setClubsList(data.records);
    } catch (error) {
      console.error('Error fetching data:', error);
      // You can also set an error state here, if you want to display an error message in the UI.
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDropdownValueChange = (valuecat: any) => {
    setDropdownValue(valuecat);
  };
  const handleSubCategoryDropdownValueChange = (valuesub: any) => {
    setSubCategoryDropdownValue(valuesub);
    console.log(valuesub, 'this is valuesub')
    
    const newClubs = clubs.filter((club) => club.subcategory === valuesub);
    console.log(newClubs, 'this is newClubs')
    setClubsList(newClubs);
  };

  console.log(dropdownValue, subCategoryDropdownValue)
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
   
      <Swiper
        cards={clubsList}
        infinite={true}
        stackSize={5}
        animateOverlayLabelsOpacity
        animateCardOpacity
        key={clubsList.length} // Important for pagination i heard?
        keyExtractor={card => card.id}
        backgroundColor={'transparent'}
        cardHorizontalMargin={5}
        renderCard={card => (
        // onSwipedAll={updateCards} useful later for pagination
          <ClubCard
            data={card}
            locationData={undefined}
            key={card.id}
          />
        )}
      />   
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
    gap: 5,
  },
})


export default ClubsIndexScreen