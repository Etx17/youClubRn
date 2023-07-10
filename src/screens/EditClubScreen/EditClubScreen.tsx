import { View, Text, Alert, ScrollView, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput, Card, HelperText} from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import colors from '../../themes/colors';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClubSchema, Club } from '../../schema/club.schema';
import ControlledInput from '../../components/ControlledInput';
import { useAuthContext } from '../../contexts/AuthContext';
export default function EditClubScreen() {
  // Pour le composant de selection d'image,
  // Il me faut en entrée l'array d'images actuel du club. Je vais le hardcoder ici mais iu faudra le récupérer de l'API
  // Ensuite, je dois pouvoir ajouter ou supprimer des images de cet array.


  // --------------------------------------------------------------------------------------
  // START--------------------------MOCKING FETCHING DATA FROM API--------------------------
  // --------------------------------------------------------------------------------------
  const actualImagesFromClub = [ "https://source.unsplash.com/random/?salsa", "https://source.unsplash.com/random/?bachata" ]
  const clubName = "Salsa Club"
  const clubDescription = "Au cœur de la vibrante capitale française se trouve El Ritmo de la Noche, un club de salsa à Paris offrant une expérience authentique et exaltante de la danse latine. C'est bien plus qu'un simple club, c'est un sanctuaire pour les amoureux de la salsa. Chaque note de musique et chaque pas sur la piste de danse témoignent de notre passion pour cette danse envoûtante. Dès l'entrée, vous serez enveloppé par une ambiance électrisante, avec des lumières tamisées, des peintures murales inspirées des rues de La Havane et une musique live envoûtante. Nous proposons des cours de salsa adaptés à tous les niveaux, encadrés par des instructeurs expérimentés et passionnés. Laissez-vous guider avec patience et enthousiasme, libérez-vous et trouvez votre propre style sur la piste de danse. Venez vivre l'essence de Cuba au cœur de Paris !"
  // --------------------------------------------------------------------------------------
  // END--------------------------MOCKING FETCHING DATA FROM API--------------------------
  // --------------------------------------------------------------------------------------
 

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Club>({
    resolver: zodResolver(ClubSchema),
  });
  console.log(errors);
  
  const [selectedImages, setSelectedImages] = useState([]);
  const numRows = selectedImages.length < 3 ? 1 : 2;
  const navigation = useNavigation()
  const { user } = useAuthContext();
  useEffect(() => { setSelectedImages(actualImagesFromClub) }, [])

  const saveAndGoBack = (data: {}) => {
    // Donner tout l'array d'images ( uris déja existant + //files) mais n'Upload que les selectedImages qui ne sont pas déja des uris (mais qui sont des files//) et obtenir l'array d'uris en retour.
    // Remplacer l'ancien array d'images la ou il y avait les //files par leurs nouvelles uris
    // Ensuite, faire un fetch pour mettre à jour le club avec les nouvelles uris, la nouvelle description si il y en a une, le nouveau nom si il y en a un, le nouveau site web si il y en a un.
    // Navigation go back
    console.log(data, 'form fields:', data)
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
          <Card.Title title="Ajoutez ou supprimez des photos de votre club" />
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
        </Card>
        <Card>
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
              placeholder="https://www.salsaparis.com"
            />

          </Card.Content>
        </Card>
        <Button style={{marginBottom: 30}} onPress={handleSubmit(saveAndGoBack)}mode='elevated' textColor='black'>Enregistrer</Button>
      </View>
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
