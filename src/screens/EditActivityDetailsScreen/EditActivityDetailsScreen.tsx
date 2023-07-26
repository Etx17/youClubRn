import { View, Text, Alert, ScrollView, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card, Switch, Checkbox} from 'react-native-paper'
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
import { updateImageKeysInS3 } from '../../services/ImageService';
type PricingTypes = {
  [key: string]: boolean;
}

export default function EditActivityDetailsScreen() {

  // --------------------------------------------------------------------------------------
  // START--------------------------MOCKING FETCHING DATA FROM API--------------------------
  // --------------------------------------------------------------------------------------
  const actualImagesFromClub = [ "https://source.unsplash.com/random/?salsa", "https://source.unsplash.com/random/?bachata" ]
  const activityName = "Salsa"
  const activityDescription = "Une des danses latino les plus connues. Venez apprendre, tous publics. Vous pourrez participer à des soirées organisées par le club, mais aussi des stages, conférences, workshop... !"
  const currentPricingTypes = ["monthly", "yearly", "perUnit"]
  const currentPricingTypesToObject: PricingTypes = {
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
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const numRows = selectedImages.length < 3 ? 1 : 2;
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigation = useNavigation()
  const { user } = useAuthContext();
  const [checkedItems, setCheckedItems] = useState<PricingTypes>(currentPricingTypesToObject);
  useEffect(() => {
    setSelectedImages(actualImagesFromClub)
    setValue('name', activityName)
    setValue('description', activityDescription)
    setValue('pricingTypes', currentPricingTypes)
  }, [])

  const handleDropdownValueChange = (valuecat: string) => {
    console.log('valuecat', valuecat);
    setDropdownValue(valuecat);
  };

  const handleSubCategoryDropdownValueChange = (valuesub: string) => {
    setSubCategoryDropdownValue(valuesub);
    console.log('valuesub', valuesub);
  };

  const handleCheck = (itemKey: string, onChange: (checkedKeys: string[]) => void) => {
    // setCheckedItems({ ...checkedItems, [itemKey]: !checkedItems[itemKey] });
    const newCheckedItems = { ...checkedItems, [itemKey]: !checkedItems[itemKey] };
    setCheckedItems(newCheckedItems);
    // Convert the checkedItems object into an array of checked keys
    const checkedKeys = Object.keys(newCheckedItems).filter(key => newCheckedItems[key]);
    onChange(checkedKeys); // Update the form control
  };

  const saveAndGoBack = async (data: {}) => {
    if (isSubmitting) { return }
    setIsSubmitting(true);
    // Transform data into an object that can be sent to the rails API
    const activityObj = { ...data, club_id: 2 };

    try {
      // Chekcs for images that were deleted or added and removes/add them from S3
      const finalImageKeys = await updateImageKeysInS3(actualImagesFromClub, selectedImages);

      // Step 2: Add the merged keys to clubObj
      activityObj.images = finalImageKeys;

      console.log(activityObj.images, "this is the final image keys")

      // After all images are processed, proceed with saving the club object
      // TODO: Call your API to update the club with the modified data (clubObj)
      console.warn('Mocking club update with the following data:', activityObj);

      // Finally, navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.log(error, 'there was an error during the process');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.5,
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      console.log('hey, you just selected some pictures')
      const images: string[] = []
      result.assets.forEach(image => { images.push(image.uri) })
      setSelectedImages(prevImages => [...prevImages, ...images]);

    } else {
      alert('You did not select any image.');
    }
  };


  return (
    <ScrollView style={{ padding: 15, flex: 1}}>
      { isSubmitting ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
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
            />

            <ControlledInput
              control={control}
              name="description"
              label="Description"
              multiline
            />

            <ControlledInput
              control={control}
              name="website"
              label="Lien d'inscription ou site web"
            />

            <ControlledInput
              control={control}
              name="address"
              label="Addresse (si différente de celle du club)"
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
      )}
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
