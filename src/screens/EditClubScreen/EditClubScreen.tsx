import { View, Text, Alert, ScrollView, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput, Card, HelperText} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClubSchema, Club } from '../../schema/club.schema';
import ControlledInput from '../../components/ControlledInput';
import { useAuthContext } from '../../contexts/AuthContext';
import PhotosSection from '../../components/photosSection';
import { updateImageKeysInS3, uploadImageToS3 } from '../../services/ImageService';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';
import { useMutation } from '@apollo/client';
import { UPDATE_CLUB } from './mutations';


export default function EditClubScreen() {
  const route = useRoute();
  const navigation = useNavigation()
  // console.log(route.params);
  const {clubData, images} = route.params as any;
  // --------------------------------------------------------------------------------------
  // START--------------------------MOCKING FETCHING DATA FROM API--------------------------
  // --------------------------------------------------------------------------------------
  const actualImagesFromClub = images
  const clubName = clubData.name
  const category = clubData.category
  const subcategory = clubData.subcategory
  const clubDescription = clubData.objet
  // --------------------------------------------------------------------------------------
  // END--------------------------MOCKING FETCHING DATA FROM API--------------------------
  // --------------------------------------------------------------------------------------

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Club>({
    resolver: zodResolver(ClubSchema),
  });
  console.log(errors, '<== errors');
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState('Judo');
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const numRows = selectedImages.length < 3 ? 1 : 2;
  const { user } = useAuthContext();

  const [updateClub, { data, loading, error }] = useMutation(UPDATE_CLUB);

  useEffect(() => {
    setSelectedImages(actualImagesFromClub)
    setValue("name", clubName);
    setValue("objet", clubDescription);
    setDropdownValue(category);
    setSubCategoryDropdownValue(subcategory);
  }, [])

  const saveAndGoBack = async (data: {}) => {
    if (isSubmitting) { return }
    setIsSubmitting(true);
    // Transform data into an object that can be sent to the rails API
    const clubObj = { ...data, user_id: user.id, category: dropdownValue, subcategory: subCategoryDropdownValue, images: [] };

    try {
      // Chekcs for images that were deleted or added and removes/add them from S3
      const finalImageKeys = await updateImageKeysInS3(actualImagesFromClub, selectedImages);

      // Step 2: Add the merged keys to clubObj
      clubObj.images = finalImageKeys;

      // console.log(clubObj.images, "this is the final image keys")

      // Calling update in my db
      await updateClub({variables: {
        input: {
          id: clubData.id,
          name: clubObj.name,
          objet: clubObj.objet,
          category: clubObj.category,
          subcategory: clubObj.subcategory,
          images: clubObj.images,
          website: clubObj.website,
        }
      }}).then(() =>
        navigation.goBack()
      )
      console.warn('Mocking club update with the following data:', clubObj);

      // Finally, navigate back to the previous screen

    } catch (error) {
      console.log(error, 'there was an error during the process');
    } finally {
      setIsSubmitting(false);
    }
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

  const handleImageDelete = (imageUri: string) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((image) => image !== imageUri)
    );
  }

  const handleDropdownValueChange = (valuecat: string) => {
    console.log('valuecat', valuecat);
    setDropdownValue(valuecat);
  };

  const handleSubCategoryDropdownValueChange = (valuesub: string) => {
    setSubCategoryDropdownValue(valuesub);
    console.log('valuesub', valuesub);
  };


  return (
    <ScrollView style={{ padding: 15, flex: 1}}>
    { isSubmitting ? (
      <ActivityIndicator size="large" color="blue" />
    ) : (
      <View style={{gap: 15}}>
        <Card>
          <Card.Title title="Ajoutez ou supprimez des photos de votre club" />

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
        </Card>
        <Card>
          <Card.Title title="Catégorie et sous-catégorie"/>
            <View style={styles.dropdownContainer}>
              <Dropdown
                style={{ flex: 1 }}
                valuecat={dropdownValue}
                onValueChange={handleDropdownValueChange}
                defaultValue={category}
              />
              <SubCategoryDropdown
                style={{ flex: 1 }}
                valuesub={subCategoryDropdownValue}
                onValueChange={handleSubCategoryDropdownValueChange}
                categoryName={dropdownValue || ''}
                defaultValue={subcategory}
              />
            </View>
          <Card.Title title="Modifiez les informations de votre club"/>
          <Card.Content style={{gap: 5}}>

            <ControlledInput
              control={control}
              name="name"
              label="Nom du club"
              placeholder={clubName}
            />

            <ControlledInput
              control={control}
              name="objet"
              label="Description"
              placeholder={clubDescription}
              multiline
            />

            <ControlledInput
              control={control}
              name="website"
              label="Lien d'inscription ou site web"
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
  dropdownContainer: {
    zIndex: 3000, // Necessary
    flexDirection: 'row',
    gap: 0,
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
