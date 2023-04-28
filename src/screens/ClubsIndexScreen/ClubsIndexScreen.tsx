import React, {FC, useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView, Text, FlatList }  from 'react-native';
import ClubCard from '../../components/ClubCard';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';
// import clubs from '../../assets/data/clubs.json';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocationContext } from '../../contexts/LocationContext';
import { Alert } from 'react-native';
import { useQuery } from 'react-query';
import axios from 'axios';



const ClubsIndexScreen = () => {
  const [clubs, setClubs] = useState([]);
  const {lat, lon} = useLocationContext()
  const [dropdownValue, setDropdownValue] = useState("sports");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const [index, setIndex] = useState(0);
  const [cardLength, setCardLength] = useState<number>(clubs.length);
  const [isFetching, setIsFetching] = useState(false);


  const fetchData = async () => {
    const url = `https://journal-officiel-datadila.opendatasoft.com/api/records/1.0/search/?dataset=jo_associations&q=&rows=1000&start=0&sort=dateparution&facet=domaine_activite_categorise&facet=domaine_activite_libelle_categorise&refine.domaine_activite_libelle_categorise=Sports%2C+activit%C3%A9s+de+plein+air&refine.localisation_facette=%C3%8Ele-de-France&exclude.objet=%22%22&exclude.domaine_activite_libelle_categorise=%22%22&`;
    const response = await axios.get(url);
    return response.data;
  };

  useEffect(() => {
    const fetchClubs = async () => {
      setIsFetching(true);
      const data = await fetchData();
      const clubsWithObjectAndSubcategory = data?.records.filter(
        (club: {fields: {objet: string, domaine_activite_libelle_categorise: string}}) => club?.fields?.objet 
          && club?.fields?.objet.trim() !== "" 
          && club?.fields?.domaine_activite_libelle_categorise.split('/')[1].split('###')[0] 
          && club?.fields?.domaine_activite_libelle_categorise.split('/')[1].split('###')[0].trim() !== ""
        );
      setClubs(clubsWithObjectAndSubcategory);
      setIsFetching(false);
    };
    fetchClubs();
  }, []);

 
  const handleDropdownValueChange = (valuecat: any) => {
    setDropdownValue(valuecat);
  };
  const handleSubCategoryDropdownValueChange = (valuesub: any) => {
    setSubCategoryDropdownValue(valuesub);
    // console.log(valuesub, 'this is valuesub')
    if(clubs){
      const newClubs = clubs.filter((club) => club?.domaine_activite_libelle_categorise.split('/')[0] === valuesub);
      setClubs(newClubs);
    }
    // console.log(newClubs, 'this is newClubs')
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
    { clubs.length > 0 && 
      <Swiper
        cards={clubs.length > 0 ? clubs : []}
        infinite={false}
        stackSize={5}
        cardIndex={index}
        animateOverlayLabelsOpacity
        animateCardOpacity
        key={clubs.length } // Important for pagination i heard?
        backgroundColor={'transparent'}
        cardHorizontalMargin={5}
        onSwipedAll={()=>Alert.alert('No more clubs')} //useful later for pagination
        renderCard={(card, cardIndex) => (
          <ClubCard
            data={card}
            locationData={undefined}
          />
        )}
      />   
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
    gap: 5,
  },
})


export default ClubsIndexScreen