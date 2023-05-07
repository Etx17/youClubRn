import React, {FC, useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView, Text, FlatList, ActivityIndicator }  from 'react-native';
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
  const [subCategoryClubs, setSubCategoryClubs] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const [isFetching, setIsFetching] = useState(false);
  const {city} = useLocationContext();
  console.log(city, 'this is city on mounting club index screen')
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
      // Avec les assos juste de paris, probleme plantage 'split' of undefined
      // const url = `https://journal-officiel-datadila.opendatasoft.com/api/records/1.0/search/?dataset=jo_associations&q=&rows=1000&sort=dateparution&facet=lieu_declaration_facette&facet=domaine_activite_categorise&facet=domaine_activite_libelle_categorise&refine.domaine_activite_libelle_categorise=${encodedDropdownValueSpaceIntoPlus}&refine.lieu_declaration_facette=${city}&exclude.objet=%22%22&exclude.domaine_activite_libelle_categorise=%22%22&`;
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
      setIsFetching(true);
      const data = await fetchData();
      console.log(data?.records.length, 'this is data records length');
      const clubsWithObjectAndSubcategory = 
        data?.records.filter(
          (club: {fields: {objet: any, domaine_activite_libelle_categorise: string}}) => club?.fields?.objet 
            && club?.fields?.objet.trim() !== "" 
            && club?.fields?.domaine_activite_libelle_categorise.split('/')[1].split('###')[0] 
            && club?.fields?.domaine_activite_libelle_categorise.split('/')[1].split('###')[0].trim() !== ""
        // );
        // data?.records.filter(club => club.fields.hasOwnProperty('objet') && club.fields.hasOwnProperty('domaine_activite_libelle_categorise') && club?.fields?.domaine_activite_libelle_categorise.split('/')[1].split('###')[0].trim() !== ""
        );
      console.log(clubsWithObjectAndSubcategory.length, 'this is clubsWithObjectAndSubcategory.length after ');
        
      setIsFetching(false);
      setClubs(clubsWithObjectAndSubcategory);
      setSubCategoryClubs(clubsWithObjectAndSubcategory);
    };
    fetchClubs();
  }, [dropdownValue, city]);

 
  const handleDropdownValueChange = (valuecat: any) => {
    // console.log(valuecat, 'this is valuecat that is supposed to be selected')
    setDropdownValue(valuecat);
  };
  const handleSubCategoryDropdownValueChange = (valuesub: any) => {
    if (valuesub === 'all' || null || undefined) { 
      return setSubCategoryClubs(clubs);
    } else {
      setSubCategoryDropdownValue(valuesub);
    
    if(clubs.length > 0){
      // console.log('welcome in handle subcategory dropdown value change')
      // console.log(valuesub, ' <== this is valuesub')
      // console.log(clubs[0], 'this is clubs[0]')
      // console.log(clubs.length, 'before filter')
      
      // console.log(clubs[0].fields.domaine_activite_libelle_categorise)
      // console.log(clubs[0].fields.domaine_activite_libelle_categorise.includes(valuesub), "= this is the result of the includes method on the first club amongs many.")
      // console.log(clubs[0].fields.domaine_activite_libelle_categorise, 'first club')// clubs.map((club) => { console.log(club.fields.domaine_activite_libelle_categorise.split('/')[1].split("###")[0] , "<= this is the items loggeed at split1 split0.") })
      const newClubs = clubs.filter((club: { fields: { domaine_activite_libelle_categorise: string}}) => club?.fields?.domaine_activite_libelle_categorise.split('/')[1].split("###")[0] === valuesub);
      setSubCategoryClubs(newClubs);
      console.log(newClubs.length, '<= AFTER FILTER LENGTH')
      // console.log(newClubs[0].fields, "this is first newClub fields")
      } else {
        setIsFetching(false)
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
    gap: 5,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})


export default ClubsIndexScreen