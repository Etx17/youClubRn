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
  // const {lat, lon} = useLocationContext()
  const [subCategoryClubs, setSubCategoryClubs] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  // const [index, setIndex] = useState(0);
  // const [cardLength, setCardLength] = useState<number>(clubs.length);
  const [isFetching, setIsFetching] = useState(false);


  const fetchData = async () => {
    try {
     
      const encodedDropdownValue = encodeURIComponent(dropdownValue).replace(/'/g, "%E2%80%99");
      const encodedDropdownValueSpaceIntoPlus = encodedDropdownValue.replace(/%20/g, "+");
      console.log("encodedDropdownValue", encodedDropdownValueSpaceIntoPlus);
      //!work et dohttps://journal-officiel-datadila.opendatasoft.com/api/records/1.0/search/?dataset=jo_associations&q=&rows=11&sort=dateparution&facet=lieu_declaration_facette&facet=domaine_activite_categorise&facet=domaine_activite_libelle_categorise&refine..localisation_facette=%C3%8Ele-de-France&refine.domaine_activite_libelle_categorise=%C3%89ducation+formation&refine.lieu_declaration_facette=Paris
      const url = `https://journal-officiel-datadila.opendatasoft.com/api/records/1.0/search/?dataset=jo_associations&q=&rows=11&sort=dateparution&facet=lieu_declaration_facette&facet=domaine_activite_categorise&facet=domaine_activite_libelle_categorise&refine.domaine_activite_libelle_categorise=${encodedDropdownValueSpaceIntoPlus}&refine.localisation_facette=%C3%8Ele-de-France&refine.lieu_declaration_facette=Paris`;
      
     
      //working:   https://journal-officiel-datadila.opendatasoft.com/api/records/1.0/search/?dataset=jo_associations&q=&rows=11&sort=dateparution&facet=lieu_declaration_facette&facet=domaine_activite_categorise&facet=domaine_activite_libelle_categorise&refine.localisation_facette=%C3%8Ele-de-France&refine.domaine_activite_libelle_categorise=%C3%A9ducation+formation&refine.lieu_declaration_facette=Paris
      console.log(url, 'this is url')
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
 
  useEffect(() => {
    const fetchClubs = async () => {
      const data = await fetchData();
      console.log(data.records.length)
      console.log(data?.records[1].fields.objet, 'this is records[1].titre')
      const clubsWithObjectAndSubcategory = data?.records.filter(
        (club: {fields: {objet: string, domaine_activite_libelle_categorise: string}}) => club?.fields?.objet 
          && club?.fields?.objet.trim() !== "" 
          && club?.fields?.domaine_activite_libelle_categorise.split('/')[1].split('###')[0] 
          && club?.fields?.domaine_activite_libelle_categorise.split('/')[1].split('###')[0].trim() !== ""
        );
        console.log(clubsWithObjectAndSubcategory.length, 'this is clubsWithObjectAndSubcategory.length');
        
      setClubs(clubsWithObjectAndSubcategory);
      setSubCategoryClubs(clubsWithObjectAndSubcategory);
    };
    fetchClubs();
  }, [dropdownValue]);

 
  const handleDropdownValueChange = (valuecat: any) => {
    console.log(valuecat, 'this is valuecat that is supposed to be selected')
    setDropdownValue(valuecat);
  };
  const handleSubCategoryDropdownValueChange = (valuesub: any) => {
    if (valuesub === 'all' || null || undefined) { 
      return setSubCategoryClubs(clubs);
    } else {
      setSubCategoryDropdownValue(valuesub);
    
    if(clubs.length > 0){
      
      console.log(valuesub, 'this is valuesub')
      // console.log(clubs[0], 'this is clubs[0]')
      console.log(clubs.length, 'before filter')
      // console.log(clubs[0].fields.domaine_activite_libelle_categorise.split('/')[0] , "this is the condition")
      
      // clubs.map((club) => { console.log(club.fields.domaine_activite_libelle_categorise.split('/')[1] === valuesub) })
      const newClubs = clubs.filter((club: { fields: { domaine_activite_libelle_categorise: string}}) => club?.fields?.domaine_activite_libelle_categorise.split('/')[1] === valuesub);
      setSubCategoryClubs(newClubs);
      // console.log(newClubs, 'this is newClubs')
    }
    }
    
  };
// console.log(dropdownValue, subCategoryDropdownValue, 'this is dropdownValue and subCategoryDropdownvalue')
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
    { subCategoryClubs.length > 0 && 
      <Swiper
        cards={subCategoryClubs}
        infinite={false}
        stackSize={2}
        // cardIndex={index}
        animateOverlayLabelsOpacity
        animateCardOpacity
        key={subCategoryClubs.length } // Important for pagination i heard?
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