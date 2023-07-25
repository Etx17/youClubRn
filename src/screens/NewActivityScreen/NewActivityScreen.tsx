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
import { useAuthContext } from '../../contexts/AuthContext';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';
import { Storage } from 'aws-amplify';

const NewActivityScreen = (clubId: string) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Activity>({
    resolver: zodResolver(ActivitySchema),
  });
  console.log(errors);
  // const [imagesKeys, setImagesKeys] = useState<string[]>([])
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigation = useNavigation()
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const numRows = selectedImages.length < 3 ? 1 : 2;
  const [hasFreeTrial, setHasFreeTrial] = React.useState(false);
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

  // const pickImageAsync = async () => {
  //   try {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     quality: 0.5,
  //     allowsMultipleSelection: true,
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     // maxWidth: 450,
  //     // maxHeight: 700,
  //   });
  //     if (!result.canceled) {
  //       const images: string[] = []
  //       result.assets.forEach(image => { images.push(image.uri) })
  //       setSelectedImages(prevImages => [...prevImages, ...images]);
  //       // console.log(selectedImages)

  //     } else {
  //       alert('You did not select any image.');
  //     }
  //   } catch (error) {
  //     // Handle the error here
  //     console.error('Error picking image:', error);
  //     Alert.alert('Error', 'There was an error picking the image. Please try again.');
  //   }
  // };
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
      // Handle the error here
      console.error('Error picking image:', error);
      Alert.alert('Error', 'There was an error picking the image. Please try again.');
    } finally {
      setImagePickerVisible(false); // Hide the activity indicator after the process completes (success or error)
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
          return await uploadMedia(image)
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
        // console.log(restaurantObj.images, 'this is restaurantObj.images ready to be sent to the mutation')
        try {
          console.log(activityObj, 'this is activityJob ready to be sent to the mutation')
          // await doCreateRestaurant({variables: {input: restaurantObj}});
          // alert('the restaurant has been created');
          // setIsSubmitting(false);
          // navigation.popToTop();
          // // vider le formulaire des infos prérentrées.
          // navigation.navigate('PlacesList');
          Alert.alert('Votre activité a été créée avec succès !', 'Vous pouvez maintenant la retrouver dans la liste des activités de votre club. Vous pouvez la modifier à tout moment en cliquant dessus.')
          navigation.goBack();
          } catch (error) {
            console.log(error, 'there was an error creating the restaurant');
          setIsSubmitting(false);
          }
      });
    }
    // console.log(imagesKeys, 'this is const imagesKeys after setImagesKeys')


    // My array of imagesKeys will be sent to my rails API as well with other data.
    // merge data with imagesKeys into one big object so that my rails api reads it.

    // TODO: Send all data to DB


  }

  // Image uploading to S3 (then will have to update my db with the key returned)
  const uploadMedia = async(uri: string) => {
    // fetch the image from the local uri and upload it to s3 using the Storage.put method then return the key and set it to the imagesKeys state
    try {
      console.log(uri, '<----- this is URI to be uploaded')
      const response = await fetch(uri);
      const blob = await response.blob();
      const s3Response = await Storage.put(
        blob._data.name,
        blob,
        { progressCallback(progress) { console.log(`Uploaded: ${progress.loaded}/${progress.total}`); }, }
      );
      console.log(s3Response.key, 'this is s3Response.key after uploading')
      imagesKeys.push(s3Response.key);
      // setImagesKeys(prevImages => [...prevImages, s3Response.key]);
      // console.log(imagesKeys, 'this is const imagesKeys after setImagesKeys after uploading')
      return s3Response.key;
    } catch (e:any) {
      Alert.alert("Error uploading file", e.message);
    }
  }

  return (
    <ScrollView style={{ padding: 15, flex: 1}}>
      {isSubmitting ? (
          <ActivityIndicator size="large" color="gtay" style={{ marginTop: 20 }} />
        ) : (
        <View style={{gap: 15}}>
          <Card>
            <Card.Title title="Ajoutez des photos de votre activité" />
              {/* Component d'input pour des photos */}
              {isImagePickerVisible ? (
                <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
              ) : selectedImages.length > 0 ? (
                <View style={{borderWidth: 0, margin: 10}}>
                  <FlatList
                    data={selectedImages}
                    keyExtractor={(item) => item}
                    numColumns={3}
                    scrollEnabled={false}
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
    width: "30%",
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black'
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
