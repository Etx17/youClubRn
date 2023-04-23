import React, {useState} from 'react';
import { View, StyleSheet }  from 'react-native';
import ClubCard from '../../components/ClubCard';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';

const HomeScreen = () => {
  const [dropdownValue1, setDropdownValue1] = useState(null);
  const [dropdownValue2, setDropdownValue2] = useState(null);

return (
  
  <View style={styles.container }>
    <View style={styles.dropdownContainer}>
      <Dropdown style={{ flex: 1 }}  />
      <SubCategoryDropdown style={{ flex: 1 }}  />
    </View>
    <ClubCard/>
  </View>

);}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 5
  },
  dropdownContainer: {
    zIndex: 3000,
    flexDirection: 'row',
    gap: 5,
  },
})


export default HomeScreen