import React, { useEffect, useState} from 'react';
import { View, StyleSheet, Text, ActivityIndicator }  from 'react-native';
import ActivityCard from '../../components/ActivityCard';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';
import Swiper from 'react-native-deck-swiper';
import { StatusBar } from 'expo-status-bar';
import { useLocationContext } from '../../contexts/LocationContext';
import { Alert } from 'react-native';
import axios from 'axios';
import { Pressable } from 'react-native';
import colors from '../../themes/colors';
import dataActivities from '../../assets/data/dataActivities.json';
const BASE_URL = "future url de mon api"
const fetchData = async () => {};

const ActivitiesIndexScreen = () => {

 
  const [activities, setActivities] = useState<[]>([]);
  const [subCategoryActivities, setSubCategoryActivities] = useState<[]>([]);
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const [isFetching, setIsFetching] = useState(false);
  const { city, region, subregion, allowLocation } = useLocationContext();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (dataActivities.length > 0) {
      // console.log(activities[0], '<= this is activities[0]')
    }
    setActivities(dataActivities)

  }, [allowLocation, dropdownValue, region, subregion, reload]);

  const handleDropdownValueChange = (valuecat: string) => {
    setDropdownValue(valuecat);
  };

  const handleSubCategoryDropdownValueChange = (valuesub: string) => {
    if (valuesub === 'all' || !valuesub) {
      return setSubCategoryActivities(activities);
    } else {
      setSubCategoryDropdownValue(valuesub);
      console.log('valuesub', valuesub);
      console.log('activities.length before filter =>', activities.length);
      // Check if subcategories of a club include valuesub
      const newActivities = activities.filter((activity) => activity?.subcategories?.includes(valuesub));
      console.log('newactivities.length after filter =>', newActivities.length);
      setSubCategoryActivities(newActivities);
    }
  };

  const handleReload = () => {
    setReload(true);
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
      ) : subCategoryActivities.length > 0 ? (
      <Swiper
        cards={subCategoryActivities}
        infinite={true}
        stackSize={1}
        cardIndex={0}
        animateOverlayLabelsOpacity
        animateCardOpacity
        key={subCategoryActivities.length }
        backgroundColor={'transparent'}
        cardHorizontalMargin={5}
        onSwipedAll={()=>Alert.alert('No more activities')}
        renderCard={(card) =>
          (
          <ActivityCard
            data={card}
          />
        )}
      />
      ) :  (
        <View style={styles.loading}>

        { city ? (
          <View>
          <Text >Aucun club trouvé.</Text>
          <Pressable style={styles.reloadButton} onPress={handleReload}>
          <Text style={styles.reloadButtonText}>Reload</Text>
          </Pressable>
          </View>
        ) : (
          <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Pressable style={styles.reloadButton} onPress={handleReload}>
          <Text style={styles.reloadButtonText}>Reload</Text>
          </Pressable>
          </View>
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
  },
  reloadButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  reloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})


export default ActivitiesIndexScreen
