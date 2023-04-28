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
    console.log(lat, lon, 'Current coordinates');

  const [dropdownValue, setDropdownValue] = useState("sports");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");

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
        infinite={false}
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