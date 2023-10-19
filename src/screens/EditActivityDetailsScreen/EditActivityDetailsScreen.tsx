import { View, Text, Alert, ScrollView, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card, Switch, Checkbox} from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import colors from '../../themes/colors';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivitySchema, Activity } from '../../schema/activity.schema';
import ControlledInput from '../../components/ControlledInput';
import { useAuthContext } from '../../contexts/AuthContext';
import Dropdown from '../../components/Dropdown';
import SubCategoryDropdown from '../../components/SubCategoryDropdown';
// import { updateImageKeysInS3 } from '../../services/ImageService';
import { GET_ACTIVITY_IMAGES } from './queries';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ACTIVITY } from './mutation';
import { Storage } from 'aws-amplify';
import { uploadImageToS3 } from '../../services/ImageService';
type PricingTypes = {
  [key: string]: boolean;
}

export default function EditActivityDetailsScreen() {

  // --------------------------------------------------------------------------------------
  // START--------------------------MOCKING FETCHING DATA FROM API--------------------------
  // --------------------------------------------------------------------------------------
  const actualImagesFromClub = [ "https://source.unsplash.com/random/?salsa", "https://source.unsplash.com/random/?bachata" ]
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
  // const category = "Sports, activités de plein air"
  // --------------------------------------------------------------------------------------
  // END--------------------------MOCKING FETCHING DATA FROM API--------------------------
  // --------------------------------------------------------------------------------------


  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Activity>({
    resolver: zodResolver(ActivitySchema),
  });
  console.log(errors);
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Sports, activités de plein air");
  const [subCategoryDropdownValue, setSubCategoryDropdownValue] = useState("all");
  const [hasFreeTrial, setHasFreeTrial] = React.useState(false);
  // const numRows = selectedImages.length < 3 ? 1 : 2;
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigation = useNavigation()
  const { user } = useAuthContext();
  const [checkedItems, setCheckedItems] = useState<PricingTypes>(currentPricingTypesToObject);
  const route = useRoute();
  const { activityData, images} = route?.params as any;
  const [selectedPhoto, setSelectedPhoto] = useState<null | string >(null);
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [currentActivityPhoto, setCurrentActivityPhoto] = useState<string | undefined>(undefined);

  const [updateActivity, { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_ACTIVITY);

  const { data, loading, error } = useQuery(GET_ACTIVITY_IMAGES, { variables: { id: activityData.id } });
  console.log(data, 'this is data from GET ACTIVITY IMAGES')

  useEffect(() => {
    const fetchActivityPhoto = async () => {
      // Au chargement du screen, je vais chercher l'url de l'image du club actuelle
      if (data?.activity.images) {
        try {
          const url = await Storage.get(data?.activity.images[0]);
          setCurrentActivityPhoto(url);
        } catch (error) {
          console.error("Error fetching club photo:", error);
        }
      }
    };

    fetchActivityPhoto();
  }, [data]);

  useEffect(() => {
    setValue('name', activityData.name)
    setValue('description', activityData.fullDescription)
    setValue('shortDescription', activityData.shortDescription)
    setValue('hasFreeTrial', activityData.freeTrial)
    setValue('address', activityData.address)
    setValue('website', activityData.website)
    setHasFreeTrial(activityData.freeTrial)
    setDropdownValue(activityData.category);
    setSubCategoryDropdownValue(activityData.subcategories);
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

  const saveAndGoBack = async (formData: {}) => {
    if (isSubmitting) { return }
    setIsSubmitting(true);
    // Transform data into an object that can be sent to the rails API
    const activityObj = { ...formData, club_id: 2 };

    try {
      // Chekcs for images that were deleted or added and removes/add them from S3
      if(!!selectedPhoto){
        const finalImageKey = await uploadImageToS3(selectedPhoto);
        await updateActivity({variables: {
          input: {
            id: activityData.id,
            name: activityObj.name,
            category: dropdownValue,
            subcategories: subCategoryDropdownValue,
            fullDescription: activityObj.description,
            address: activityObj.address,
            images: finalImageKey,
          }
        }}).then(() => {
          Storage.remove(data?.activity.images[0]).then( () => console.log('image removed from s3') )
          navigation.goBack()
          }
        )
      } else {

        await updateActivity({variables: {
          input: {
            id: activityData.id,
            name: activityObj.name,
            category: dropdownValue,
            subcategories: subCategoryDropdownValue,
            fullDescription: activityObj.description,
            address: activityObj.address,
          }
        }}).then(() => {
          navigation.goBack()
        })
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




  return (
    <ScrollView style={{ padding: 15, flex: 1}}>
      { isSubmitting ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
      <View style={{gap: 15}}>
        <Card>
          <Card.Title title="éditez les photos de votre activité" />
             { isImageLoading && <ActivityIndicator /> }
              <Image
                source={{ uri: selectedPhoto || currentActivityPhoto }}
                style={styles.profileImage}
                onLoadStart={() => setIsImageLoading(true)}
                onLoadEnd={() => setIsImageLoading(false)}
              />

              { !selectedPhoto && !currentActivityPhoto ? (
                <Text style={styles.addImageText} onPress={pickImageAsync}> + </Text>
              ) : (
                <Button onPress={pickImageAsync}>Modifier</Button>
              )
              }
            {/* End of image component input */}

            <Card.Title title="Catégorie et sous-catégorie"/>
            <View style={styles.dropdownContainer}>
              <Dropdown
                style={{ flex: 1 }}
                valuecat={dropdownValue}
                onValueChange={handleDropdownValueChange}
                defaultValue={activityData?.category}
              />
              <SubCategoryDropdown
                style={{ flex: 1 }}
                valuesub={subCategoryDropdownValue}
                onValueChange={handleSubCategoryDropdownValueChange}
                categoryName={dropdownValue || activityData?.category}
                defaultValue={activityData?.subcategories}
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
              name="shortDescription"
              label="Courte Description"
              multiline
            />
{/*
            <ControlledInput
              control={control}
              name="website"
              label="Lien d'inscription ou site web"
            /> */}

            <ControlledInput
              control={control}
              name="address"
              label="Adresse de l'activité"
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
                  <Text> Essai gratuit</Text>
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
  profileImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
})
