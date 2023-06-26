import { View, Text, Alert, ScrollView, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card, Checkbox, Switch } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import colors from '../../themes/colors';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivitySchema, Activity } from '../../schema/activity.schema';
import ControlledInput from '../../components/ControlledInput';
import { useAuthContext } from '../../contexts/AuthContext';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';

const NewActivityScreen = (clubId: string) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Activity>({
    resolver: zodResolver(ActivitySchema),
  });
  console.log(errors);
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const navigation = useNavigation()
  const [selectedImages, setSelectedImages] = useState([]);
  const numRows = selectedImages.length < 3 ? 1 : 2;
  const [hasFreeTrial, setHasFreeTrial] = React.useState(false);
  // Aller fetcher sur l'api pour savoir quelle sont les types de tarification de l'activité
  const [checkedItems, setCheckedItems] = useState({
    monthly: false,
    yearly: false,
    semiYearly: false,
    quarterly: false,
    perUnit: false,
    ticketBook: false,
    pass: false,
    customPackages: false,
    other: false,
  });
  const handleDropdownValueChange = (valuecat: string) => {
    console.log('valuecat', valuecat);
    setDropdownValue(valuecat);
  };

  const handleSubCategoryDropdownValueChange = (valuesub: string) => {
      setSubCategoryDropdownValue(valuesub);
      console.log('valuesub', valuesub);
  };
   
      // Check if subcategories of a club include valuesub

  const handleCheck = (itemKey, onChange) => {
    // setCheckedItems({ ...checkedItems, [itemKey]: !checkedItems[itemKey] });
    const newCheckedItems = { ...checkedItems, [itemKey]: !checkedItems[itemKey] };
    setCheckedItems(newCheckedItems);
    // Convert the checkedItems object into an array of checked keys
    const checkedKeys = Object.keys(newCheckedItems).filter(key => newCheckedItems[key]);
    onChange(checkedKeys); // Update the form control
  };

  const saveAndGoToActivity = (data) => {
    console.log(data, 'form fields:', data)
    console.log(hasFreeTrial, '<= this is has freeTrial')
    console.log(checkedItems, '<= these are the checked items')
    console.log(dropdownValue, subCategoryDropdownValue, '<= these are the dropdown values')
    Alert.alert('Votre activité a été créée avec succès !', 'Vous pouvez maintenant la retrouver dans la liste des activités de votre club. Vous pouvez la modifier à tout moment en cliquant dessus.')
    navigation.goBack()
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.5, 
      allowsMultipleSelection: true, 
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // maxWidth: 450,
      // maxHeight: 700,
    });

    if (!result.canceled) {
      console.log('hey, you just selected some pictures')
      const images = []
      result.assets.forEach(image => { images.push(image.uri) })
      setSelectedImages(prevImages => [...prevImages, ...images]);
      // console.log(selectedImages)

    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <ScrollView style={{ padding: 15, flex: 1}}>
      <View style={{gap: 15}}>
        <Card>
          <Card.Title title="Ajoutez des photos de votre activité" />
            {/* Component d'input pour des photos */}
            {selectedImages.length > 0 ? (
              <View style={{borderWidth: 0, margin: 10}}>
                <FlatList
                  data={selectedImages}
                  keyExtractor={(item) => item}
                  numColumns={3}
                  style={{ maxHeight: numRows * 150 }}
                  renderItem={({ item }) => (
                    <View style={styles.thumbnailContainer}>
                      <Image source={{ uri: item }} style={styles.thumbnail} />
                      <Pressable style={styles.deleteButton}>
                        <Ionicons
                          onPress={ () => {
                            const newImages = selectedImages.filter((image) => image !== item)
                            setSelectedImages(newImages)
                          }}
                          name='trash-outline'
                          size={20}
                          color={colors.danger}
                        />
                      </Pressable>
                    </View>
                  )}
                />
                <Text onPress={pickImageAsync} style={{fontSize: 14, color: colors.grayDarkest, margin: 10}}>{selectedImages.length} images séléctionnées <Text style={{color: colors.danger}}>(Ajouter)</Text></Text>
              </View>

            ) : (
              <Button onPress={pickImageAsync} style={styles.imageButton}>
                <Text style={styles.addImageText}>+</Text>
              </Button>
            )}
            {/* End of image component input */}
            
            <Card.Title title="Catégorie et sous-catégorie"/>
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
          <Card.Title title="Modifiez les informations de votre club"/>
          <Card.Content style={{gap: 5}}>

            <ControlledInput 
              control={control}
              name="name"
              label="Nom de l'activité"
              placeholder="Nom de l'activité"
            />

            <ControlledInput 
              control={control}
              name="description"
              label="Description"
              placeholder="Description de l'activité"
              multiline
            />

            <ControlledInput 
              control={control}
              name="address"
              label="Addresse de l'activité (si différente du club)"
            />

            <Controller 
              control={control}
              name={"hasFreeTrial"}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error, invalid },
              }) => (
                <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center'}}>
                  
                  <Switch 
                    value={hasFreeTrial}
                    onValueChange={newValue => setHasFreeTrial(newValue)}
                  />
                  <Text>Essai gratuit?</Text>
                </View>
              )}
            />

            <Controller 
              control={control}
              name={"pricingTypes"}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error, invalid },
              }) => (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                  <Text>Types de tarification disponibles</Text>
                  <Checkbox.Item label="Souscription mensuelle" status={checkedItems.monthly ? 'checked' : 'unchecked'} onPress={() => handleCheck('monthly', onChange)} />
                  <Checkbox.Item label="Souscription annuelle" status={checkedItems.yearly ? 'checked' : 'unchecked'} onPress={() => handleCheck('yearly', onChange)} />
                  <Checkbox.Item label="Souscription semestrielle" status={checkedItems.semiYearly ? 'checked' : 'unchecked'} onPress={() => handleCheck('semiYearly', onChange)} />
                  <Checkbox.Item label="Souscription trimestrielle" status={checkedItems.quarterly ? 'checked' : 'unchecked'} onPress={() => handleCheck('quarterly', onChange)} />
                  <Checkbox.Item label="À l'unité" status={checkedItems.perUnit ? 'checked' : 'unchecked'} onPress={() => handleCheck('perUnit', onChange)} />
                  <Checkbox.Item label="Carnet de tickets" status={checkedItems.ticketBook ? 'checked' : 'unchecked'} onPress={() => handleCheck('ticketBook', onChange)} />
                  <Checkbox.Item label="Pass" status={checkedItems.pass ? 'checked' : 'unchecked'} onPress={() => handleCheck('pass', onChange)} />
                  <Checkbox.Item label="Forfaits sur mesure" status={checkedItems.customPackages ? 'checked' : 'unchecked'} onPress={() => handleCheck('customPackages', onChange)} />
                  <Checkbox.Item label="Autre" status={checkedItems.other ? 'checked' : 'unchecked'} onPress={() => handleCheck('other', onChange)} />
                </View>
              )}
            />
          </Card.Content>
        </Card>
        <Button style={{marginBottom: 30}} onPress={handleSubmit(saveAndGoToActivity)}mode='elevated' textColor='black'>Enregistrer</Button>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  dropdownContainer: {
    zIndex: 3000, // Necessary
    flexDirection: 'row',
    gap: 0,
    marginTop: 1.5,
  },
  deleteButton: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 50,
    shadowOffset: { width: 2, height: 0 }, // iOS only
    shadowOpacity: 0.8, // iOS only
    elevation: 8, // Android only
  },
  thumbnailContainer: {
    margin: 4,
    marginBottom: 10,
    width: "30%",
    aspectRatio: 1,
    borderRadius: 10,
    elevation: 8, // Android only
    shadowColor: '#000', // iOS only
    shadowOffset: { width: 2, height: 0 }, // iOS only
    shadowOpacity: 0.8, // iOS only
    },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  imageButton: {
    width: "95%",
    height: 100,
    margin: 10,
    padding: 10,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  addImageText: {
    fontSize: 60,
    color: "lightgrey",
  },
})
export default NewActivityScreen