import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView, Text, FlatList }  from 'react-native';
import ClubCard from '../../components/ClubCard';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';
import clubs from '../../assets/data/clubs.json';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
const ClubsIndexScreen = () => {
  console.log(clubs[0])
  const [dropdownValue, setDropdownValue] = useState("sports");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState(null);

  const handleDropdownValueChange = (valuecat: any) => {
    setDropdownValue(valuecat);
  };

  const handleSubCategoryDropdownValueChange = (valuesub: any) => {
    setSubCategoryDropdownValue(valuesub);
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
        cards={clubs}
        infinite={true}
        stackSize={3}
        backgroundColor={'transparent'}
        
        renderCard={card => (
          <View style={{flex: 1}}>
            <ClubCard
              data={card}
              locationData={undefined}
            />
          </View>
        )}
      />
      
  </View>

);}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 0,
  },
  dropdownContainer: {
    zIndex: 3000,
    flexDirection: 'row',
    gap: 8,
  },
})


export default ClubsIndexScreen