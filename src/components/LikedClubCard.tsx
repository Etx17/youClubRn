import React from 'react'
import { View, Text, Button, StyleSheet, Pressable, Alert } from 'react-native';
import categoryImages from '../assets/data/categoryImages';
import {Image} from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntIcons from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'; 
import colors from '../themes/colors';
const LikedClubCard = ({ club, onUnLike }: any) => {
    const domaine_activite_libelle_categorise = club?.fields?.domaine_activite_libelle_categorise;
    const subCategory = domaine_activite_libelle_categorise ? domaine_activite_libelle_categorise.split('/')[1].split('###')[0].charAt(0).toUpperCase() + domaine_activite_libelle_categorise.split('/')[1].split('###')[0].slice(1) : 'Autre/Non renseigné';
    const category = domaine_activite_libelle_categorise ? domaine_activite_libelle_categorise.split('/')[0].split('###')[0].charAt(0).toUpperCase() + domaine_activite_libelle_categorise.split('/')[0].split('###')[0].slice(1) : 'Autre/Non renseigné';
    // console.log(categoryImages[category][subCategory], ' <= LIke : this is the image supposed keyword')
    const image = 
      `https://source.unsplash.com/random/?${categoryImages[category] ? categoryImages[category][subCategory] : 'random'}`
    ;
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <Image source={{uri: image}} style={styles.image}/>
        {/* <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}> */}
          <View style={styles.textContainer}>
              <Text style={styles.title}>{club?.fields?.titre}</Text>
              <Text style={styles.category}>{category}</Text>
              <Text style={styles.subcategory}>{subCategory}</Text>

              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* <View/> */}

                <Pressable onPress={() =>  Alert.alert('Bientôt disponible') }>
                  {/* //  navigation.navigate('ClubDetails', {clubData: data.fields, images}) */}
                
                  <Entypo name="cross" size={40} color="black" style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 2, height: 1}, textShadowRadius: 7  }} />
                </Pressable>
                <Pressable onPress={() =>  Alert.alert('Bientôt disponible') }>
                  {/* //  navigation.navigate('ClubDetails', {clubData: data.fields, images}) */}
                
                  <AntIcons name="arrowright" size={40} color={'black'} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />
                </Pressable>


              </View>
          </View>
         
        {/* </View> */}
        {/* <Button title="Unlike" onPress={() => onUnLike(club.id)} /> */}
   </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      borderWidth: 2, 
      backgroundColor: 'yellow', 
      flexDirection: 'row', 
      maxWidth: '100%',
      justifyContent: 'space-between',
      marginHorizontal: 5,
      marginVertical: 2.5,
      borderRadius: 10,
    },
    image: {
      height: '100%',
      aspectRatio: 1,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    textContainer: {
      flex: 1,
      // marginHorizontal: 10,
      padding: 8,
      justifyContent: 'space-around',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      // maxWidth: '60%',
    },
    category: {
      fontSize: 16,
    },
    subcategory: {
      fontSize: 14,
    },
  });
export default LikedClubCard