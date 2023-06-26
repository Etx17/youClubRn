import { View, Text, Alert, ScrollView, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput, Card, HelperText, Switch, Checkbox} from 'react-native-paper'
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
export default function EditActivityDetailsScreen() {
  // Pour le composant de selection d'image,
  // Il me faut en entrée l'array d'images actuel du club. Je vais le hardcoder ici mais iu faudra le récupérer de l'API
  // Ensuite, je dois pouvoir ajouter ou supprimer des images de cet array.


  // --------------------------------------------------------------------------------------
  // START--------------------------MOCKING FETCHING DATA FROM API--------------------------
  // --------------------------------------------------------------------------------------
  const actualImagesFromClub = [ "https://source.unsplash.com/random/?salsa", "https://source.unsplash.com/random/?bachata" ]
  const activityName = "Salsa"
  const activityDescription = "Une des danses latino les plus connues. Venez apprendre, tous publics. Vous pourrez participer à des soirées organisées par le club, mais aussi des stages, conférences, workshop... !"
  const currentPricingTypes = ["monthly", "yearly", "perUnit"]
  const currentPricingTypesToObject = {
    monthly: currentPricingTypes.includes("monthly"),
    yearly: currentPricingTypes.includes("yearly"),
    semiYearly: currentPricingTypes.includes("semiYearly"),
    quarterly: currentPricingTypes.includes("quarterly"),
    perUnit: currentPricingTypes.includes("perUnit"),
    ticketBook: currentPricingTypes.includes("ticketBook"),
    pass: currentPricingTypes.includes("pass"),
    customPackages: currentPricingTypes.includes("customPackages"),
    other: currentPricingTypes.includes("other"),
  }
  // --------------------------------------------------------------------------------------
  // END--------------------------MOCKING FETCHING DATA FROM API--------------------------
  // --------------------------------------------------------------------------------------
 

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Activity>({
    resolver: zodResolver(ActivitySchema),
  });
  console.log(errors);
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const [hasFreeTrial, setHasFreeTrial] = React.useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const numRows = selectedImages.length < 3 ? 1 : 2;
  const navigation = useNavigation()
  const { user } = useAuthContext();
  useEffect(() => { setSelectedImages(actualImagesFromClub) }, [])
  const [checkedItems, setCheckedItems] = useState(currentPricingTypesToObject);

  const handleDropdownValueChange = (valuecat: string) => {
    console.log('valuecat', valuecat);
    setDropdownValue(valuecat);
  };

  const handleSubCategoryDropdownValueChange = (valuesub: string) => {
      setSubCategoryDropdownValue(valuesub);
      console.log('valuesub', valuesub);
  };

  const handleCheck = (itemKey, onChange) => {
    // setCheckedItems({ ...checkedItems, [itemKey]: !checkedItems[itemKey] });
    const newCheckedItems = { ...checkedItems, [itemKey]: !checkedItems[itemKey] };
    setCheckedItems(newCheckedItems);
    // Convert the checkedItems object into an array of checked keys
    const checkedKeys = Object.keys(newCheckedItems).filter(key => newCheckedItems[key]);
    onChange(checkedKeys); // Update the form control
  };

  const saveAndGoBack = (data) => {
    console.log(data, 'form fields:', data)
    console.log(hasFreeTrial, '<= this is has freeTrial')
    console.log(checkedItems, '<= this is checkedItems')
    console.log(selectedImages, 'images in the saveandGoBack')
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

  const uploadMedia = async (uri: string) => {
    try {
      // Convert image into blob
      // Send blob to rails server 
      const response = await fetch(uri);
      const blob = await response.blob();

      const timestamp = new Date().getTime();
      const randomNum = Math.floor(Math.random() * 1000000);

      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];
      
      const uniqueName = `${user.id}-${timestamp}-${randomNum}.${extension}`;
   
      const s3Response = await Storage.put(uniqueName, blob)

      return s3Response.key;
    } catch(e) {
      Alert.alert('Error uploading the file', (e as Error).message)
    }
  } 
 
  return (
    <ScrollView style={{ padding: 15, flex: 1}}>
      <View style={{gap: 15}}>
        <Card>
          <Card.Title title="éditez les photos de votre activité" />
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

          <Card.Title title="Modifiez les informations de votre activité"/>
          <Card.Content style={{gap: 5}}>

            <ControlledInput 
              control={control}
              name="name"
              label="Nom de l'activité"
              placeholder={activityName}
            />

            <ControlledInput 
              control={control}
              name="description"
              label="Description"
              placeholder={activityDescription}
              multiline
            />

            <ControlledInput 
              control={control}
              name="website"
              label="Lien d'inscription ou site web"
              placeholder="https://www.salsaparis.com"
            />

            <ControlledInput 
              control={control}
              name="address"
              label="Addresse (si différente de celle du club)"
              placeholder="https://www.salsaparis.com"
            />

            <Controller 
              control={control}
              name="hasFreeTrial"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error, invalid },
              }) => (
                <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center'}}>
                  
                  <Switch 
                    value={hasFreeTrial}
                    onValueChange={newValue => setHasFreeTrial(newValue)}
                  />
                  <Text>Essai gratuit</Text>
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
        <Button style={{marginBottom: 30}} onPress={handleSubmit(saveAndGoBack)}mode='elevated' textColor='black'>Enregistrer</Button>
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
    // width: 101,
    // width: 101,
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
