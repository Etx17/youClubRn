import React, {useState} from 'react';
import { View, StyleSheet, ScrollView }  from 'react-native';
import ClubCard from '../../components/ClubCard';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';


const HomeScreen = () => {
  const [dropdownValue, setDropdownValue] = useState(null);
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState(null);

  const handleDropdownValueChange = (valuecat: any) => {
    setDropdownValue(valuecat);
    // console.log('Dropdown value:', valueOk);
  };

  const handleSubCategoryDropdownValueChange = (valuesub: any) => {
    setSubCategoryDropdownValue(valuesub);
    // console.log('Dropdown value:', valuesub);  
  };

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
      />
    </View>
    <ClubCard />
  </View>

);}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 5,
  },
  dropdownContainer: {
    zIndex: 3000,
    flexDirection: 'row',
    gap: 5,
    // zIndex: 3000,
  },
})


export default HomeScreen