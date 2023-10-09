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
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_CLUB } from './mutations';
import ApiErrorMessage from '../../components/apiErrorMessage/ApiErrorMessage';
import { GET_CLUB_BY_USER_ID } from './queries';
import { Storage } from 'aws-amplify';
import { Image } from 'expo-image';


export default function EditClubScreen() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Club>({
    resolver: zodResolver(ClubSchema),
  });
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState('Judo');
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Image related
  const [selectedPhoto, setSelectedPhoto] = useState<null | string >(null)
  const [currentClubPhoto, setCurrentClubPhoto] = useState<string | undefined>(undefined)

  const { user } = useAuthContext();
  const navigation = useNavigation()
  const route = useRoute();
  const {clubData, images} = route.params as any;
  const [isImageLoading, setIsImageLoading] = useState(false)
  const clubName = clubData.name
  const category = clubData.category
  const subcategory = clubData.subcategory
  const clubDescription = clubData.objet
  const {data, loading, error, refetch} = useQuery(GET_CLUB_BY_USER_ID, { variables: {userId: user.id} })
  // const numRows = clubImagesKeys.length < 3 ? 1 : 2;

  const [updateClub, { data:dataUpdate, loading:loadingUpdate, error:errorUpdate }] = useMutation(UPDATE_CLUB);



  useEffect(() => {
    setValue("name", clubName);
    setValue("objet", clubDescription);
    setDropdownValue(category);
    setSubCategoryDropdownValue(subcategory);
  }, [])

  useEffect(() => {
    const fetchClubPhoto = async () => {
      // Au chargement du screen, je vais chercher l'url de l'image du club actuelle
      if (data?.clubByUserId.images) {
        try {
          const url = await Storage.get(data?.clubByUserId.images[0]);
          setCurrentClubPhoto(url);
        } catch (error) {
          console.error("Error fetching club photo:", error);
        }
      }
    };

    fetchClubPhoto();
  }, [data]);


  const saveAndGoBack = async (formData: {}) => {
    if (isSubmitting) { return }
    setIsSubmitting(true);

    const clubObj = {
      ...formData,
      user_id: user.id,
      category: dropdownValue,
      subcategory: subCategoryDropdownValue,
      images: []
    };

    try {
      // If there are no images to upload, we can skip this step
      if(!!selectedPhoto){
        // Upload the new image to s3 to get a key

        const finalImageKey = await uploadImageToS3(selectedPhoto);

        await updateClub({variables: {
          input: {
            id: clubData.id,
            name: clubObj.name,
            objet: clubObj.objet,
            category: clubObj.category,
            subcategory: clubObj.subcategory,
            images: [finalImageKey],
            website: clubObj.website,
          }
        }}).then(() => {
          Storage.remove(data?.clubByUserId.images[0]).then( () => console.log('image removed from s3') )
          navigation.goBack()
          }
        )
      } else {
        await updateClub({variables: {
          input: {
            id: clubData.id,
            name: clubObj.name,
            objet: clubObj.objet,
            category: clubObj.category,
            subcategory: clubObj.subcategory,
            website: clubObj.website,
          }
        }}).then(() =>
          navigation.goBack()
        )
      }

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
        allowsMultipleSelection: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled) {
        // If multiple images are selected, result will be an array of objects
        console.log(result.assets[0].uri, "this is suppose to be an array of objects")
        setSelectedPhoto(result.assets[0].uri)
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'There was an error picking the image. Please try again.');
    } finally {
      setImagePickerVisible(false);
    }
  };


  const handleDropdownValueChange = (valuecat: string) => {
    console.log('valuecat', valuecat);
    setDropdownValue(valuecat);
  };

  const handleSubCategoryDropdownValueChange = (valuesub: string) => {
    setSubCategoryDropdownValue(valuesub);
    console.log('valuesub', valuesub);
  };

  if(loading){ return (<ActivityIndicator/>) }
  if(error){ return <ApiErrorMessage title='Error fetching or updating user' message={error?.message}/> }
  return (
    <ScrollView style={{ padding: 15, flex: 1}}>
    { isSubmitting ? (
      <ActivityIndicator size="large" color="blue" />
    ) : (
      <View style={{gap: 5}}>
        <Card>
          <Card.Title title="Photo de votre club"/>
          { isImageLoading && <ActivityIndicator /> }
          <Image
            source={{ uri: selectedPhoto || currentClubPhoto }}
            style={styles.profileImage}
            onLoadStart={() => setIsImageLoading(true)}
            onLoadEnd={() => setIsImageLoading(false)}
          />

          { !selectedPhoto && !currentClubPhoto ? (
            <Text style={styles.addImageText} onPress={pickImageAsync}> + </Text>
          ) : (
            <Button onPress={pickImageAsync}>Modifier</Button>
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
  profileImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
  }
})
