import { View, Text, Alert, ScrollView, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
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
import PhotosSection from '../../components/photosSection';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';
import { Storage } from 'aws-amplify';
import { uploadImageToS3 } from '../../services/ImageService';

const NewActivityScreen = (clubId: string) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Activity>({
    resolver: zodResolver(ActivitySchema),
  });
  const pricingTypes = [
    { label: "Mensuel", key: "monthly" },
    { label: "Annuel", key: "yearly" },
    { label: "Semestriel", key: "semiYearly" },
    { label: "Trimestriel", key: "quarterly" },
    { label: "Carnet de tickets", key: "ticketBook" },
    { label: "À l'unité", key: "perUnit" },
    { label: "Forfaits sur mesure", key: "customPackages" },
    { label: "Pass", key: "pass" },
    { label: "Autre", key: "other" },
  ];
  console.log(errors);
  // const [imagesKeys, setImagesKeys] = useState<string[]>([])
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [hasFreeTrial, setHasFreeTrial] = React.useState(false);
  const navigation = useNavigation()
  const numRows = selectedImages.length < 3 ? 1 : 2;
  const imagesKeys = []
  // Aller fetcher sur l'api pour savoir quelle sont les types de tarification de l'activité
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean; }>({
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
  const handleCheck  = (itemKey: string, onChange: (keys: string[]) => void) => {
    // setCheckedItems({ ...checkedItems, [itemKey]: !checkedItems[itemKey] });
    const newCheckedItems = { ...checkedItems, [itemKey]: !checkedItems[itemKey] };
    setCheckedItems(newCheckedItems);
    // Convert the checkedItems object into an array of checked keys
    const checkedKeys = Object.keys(newCheckedItems).filter(key => newCheckedItems[key]);
    onChange(checkedKeys); // Update the form control
  };
  const pickImageAsync = async () => {
    try {
      setImagePickerVisible(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.5,
        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled) {
        // If multiple images are selected, result will be an array of objects
        console.log(result, "this is suppose to be an array of objects")
        const selectedImageUris = result.assets.map((item) => item.uri);
        setSelectedImages((prevImages) => [...prevImages, ...selectedImageUris]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'There was an error picking the image. Please try again.');
    } finally {
      setImagePickerVisible(false);
    }
  };
  const saveAndGoToActivity = (data: {}) => {
    if (isSubmitting) {
      return
    }
    setIsSubmitting(true);
    // Transform data into an object that can be sent to the rails API
    const activityObj = {
      ...data,
      club_id: clubId,
      category: dropdownValue,
      sub_category: subCategoryDropdownValue,
      pricing: checkedItems,
      has_free_trial: hasFreeTrial,
      images: imagesKeys,
    }
    if (selectedImages) {
      // for each image, call function uploadMedia
      const imageUploadPromises = selectedImages.map(async (image) => {
        try {
          return await uploadImageToS3(image)

        } catch (error) {
          console.log(error, 'there was an error uploading the image')
        }
      });

      Promise.all(imageUploadPromises)
      .then(() => {
        activityObj.images = imagesKeys;
        console.log(activityObj.images, 'this is the object with images ready to be sent to the mutation')
        return activityObj
      }).then(async (activityObj) => {
        try {
          console.log(activityObj, 'this is activityJob ready to be sent to the mutation')
          // TODO: Appel a mon API pour créer l'activité
          Alert.alert('Votre activité a été créée avec succès !', 'Vous pouvez maintenant la retrouver dans la liste des activités de votre club. Vous pouvez la modifier à tout moment en cliquant dessus.')
          navigation.goBack();
          } catch (error) {
            console.log(error, 'there was an error creating the restaurant');
          setIsSubmitting(false);
          }
      });
    }

  }
  const handleImageDelete = async (imageUri: string) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((image) => image !== imageUri)
    );
  }

  return (
    <ScrollView style={{ padding: 15, flex: 1}}>
      {isSubmitting ? (
          <ActivityIndicator size="large" color="gtay" style={{ marginTop: 20 }} />
        ) : (
        <View style={{gap: 15}}>
          <Card>
            <Card.Title title="Ajoutez des photos de votre activité" />

              { isImagePickerVisible ? (

                <ActivityIndicator size="large" color="grey" style={{ marginTop: 20 }} />

              ) : selectedImages.length > 0 ? (

                <PhotosSection
                  selectedImages={selectedImages}
                  numRows={numRows} // Make sure to provide numRows as a prop
                  pickImageAsync={pickImageAsync} // Make sure to provide pickImageAsync as a prop
                  handleImageDelete={handleImageDelete}
                />

              ) : (

                <Button onPress={pickImageAsync} style={styles.imageButton}>
                  <Text style={styles.addImageText}>+</Text>
                </Button>

              )
              }

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
                    {/* <Checkbox.Item label="Mensuel" status={checkedItems.monthly ? 'checked' : 'unchecked'} onPress={() => handleCheck('monthly', onChange)} labelStyle={{borderColor: checkedItems.monthly ? colors.dark : 'gray', borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 4, backgroundColor: checkedItems.monthly ? colors.primary : 'lightgray' }}/>
                    <Checkbox.Item label="Annuel" status={checkedItems.yearly ? 'checked' : 'unchecked'} onPress={() => handleCheck('yearly', onChange)} labelStyle={{borderColor: checkedItems.yearly ? colors.dark : 'gray', borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 4, backgroundColor: checkedItems.yearly ? colors.primary : 'lightgray' }}/>
                    <Checkbox.Item label="Semestriel" status={checkedItems.semiYearly ? 'checked' : 'unchecked'} onPress={() => handleCheck('semiYearly', onChange)} labelStyle={{borderColor: checkedItems.semiYearly ? colors.dark : 'gray', borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 4, backgroundColor: checkedItems.semiYearly ? colors.primary : 'lightgray' }}/>
                    <Checkbox.Item label="Trimestriel" status={checkedItems.quarterly ? 'checked' : 'unchecked'} onPress={() => handleCheck('quarterly', onChange)} labelStyle={{borderColor: checkedItems.quarterly ? colors.dark : 'gray', borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 4, backgroundColor: checkedItems.quarterly ? colors.primary : 'lightgray' }}/>
                    <Checkbox.Item label="Carnet de tickets" status={checkedItems.ticketBook ? 'checked' : 'unchecked'} onPress={() => handleCheck('ticketBook', onChange)} labelStyle={{borderColor: checkedItems.ticketBook ? colors.dark : 'gray', borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 4, backgroundColor: checkedItems.ticketBook ? colors.primary : 'lightgray' }}/>
                    <Checkbox.Item label="À l'unité" status={checkedItems.perUnit ? 'checked' : 'unchecked'} onPress={() => handleCheck('perUnit', onChange)} labelStyle={{borderColor: checkedItems.perUnit ? colors.dark : 'gray', borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 4, backgroundColor: checkedItems.perUnit ? colors.primary : 'lightgray' }}/>
                    <Checkbox.Item label="Forfaits sur mesure" status={checkedItems.customPackages ? 'checked' : 'unchecked'} onPress={() => handleCheck('customPackages', onChange)} labelStyle={{borderColor: checkedItems.customPackages ? colors.dark : 'gray', borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 4, backgroundColor: checkedItems.customPackages ? colors.primary : 'lightgray' }}/>
                    <Checkbox.Item label="Pass" status={checkedItems.pass ? 'checked' : 'unchecked'} onPress={() => handleCheck('pass', onChange)} labelStyle={{borderColor: checkedItems.pass ? colors.dark : 'gray', borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 4, backgroundColor: checkedItems.pass ? colors.primary : 'lightgray' }}/>
                    <Checkbox.Item label="Autre" status={checkedItems.other ? 'checked' : 'unchecked'} onPress={() => handleCheck('other', onChange)} labelStyle={{borderColor: checkedItems.other ? 'red' : 'gray', borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 4, backgroundColor: checkedItems.other ? colors.primary : 'lightgray' }}/> */}
                    {pricingTypes.map(({ label, key }) => (
                      <Checkbox.Item
                        key={key}
                        label={label}
                        status={checkedItems[key] ? 'checked' : 'unchecked'}
                        onPress={() => handleCheck(key, onChange)}
                        style={{ padding: 0, margin: 0 }}
                        labelStyle={{
                          borderColor: checkedItems[key] ? colors.dark : 'gray',
                          borderWidth: 1.5,
                          borderRadius: 5,
                          paddingHorizontal: 8,
                          backgroundColor: checkedItems[key] ? colors.primary : 'lightgray',
                        }}
                      />
                    ))}
                  </View>
                )}
              />
            </Card.Content>
          </Card>
          <Button style={{marginBottom: 30}} onPress={handleSubmit(saveAndGoToActivity)}mode='elevated' textColor='black'>Enregistrer</Button>
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
