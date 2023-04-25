import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView }  from 'react-native';
import ClubCard from '../../components/ClubCard';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';


const HomeScreen = () => {
  const [dropdownValue, setDropdownValue] = useState("sports");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState(null);

  const handleDropdownValueChange = (valuecat: any) => {
    setDropdownValue(valuecat);
    // console.log('Dropdown value:', valueOk);
  };

  const handleSubCategoryDropdownValueChange = (valuesub: any) => {
    setSubCategoryDropdownValue(valuesub);
    // console.log('Dropdown value:', valuesub);  
  };

  // useEffect(() =>{
  //   if(dropdownValue){
      
  //   }
  // }, [dropdownValue])

  console.log(dropdownValue, subCategoryDropdownValue)
return ( 
  
  <View style={styles.container }>
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
    <ClubCard />
  </View>

);}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 8,
  },
  dropdownContainer: {
    zIndex: 3000,
    flexDirection: 'row',
    gap: 8,
  },
})


export default HomeScreen