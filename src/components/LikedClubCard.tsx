import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import categoryImages from '../assets/data/categoryImages';
import {Image} from 'expo-image';
const LikedClubCard = ({ club, onUnLike }: any) => {
    const domaine_activite_libelle_categorise = club?.fields?.domaine_activite_libelle_categorise;
    const subCategory = domaine_activite_libelle_categorise ? domaine_activite_libelle_categorise.split('/')[1].split('###')[0].charAt(0).toUpperCase() + domaine_activite_libelle_categorise.split('/')[1].split('###')[0].slice(1) : 'Autre/Non renseigné';
    const category = domaine_activite_libelle_categorise ? domaine_activite_libelle_categorise.split('/')[0].split('###')[0].charAt(0).toUpperCase() + domaine_activite_libelle_categorise.split('/')[0].split('###')[0].slice(1) : 'Autre/Non renseigné';
    console.log(categoryImages[category][subCategory], ' <= LIke : this is the image supposed keyword')
    const image = 
      `https://source.unsplash.com/random/?${categoryImages[category] ? categoryImages[category][subCategory] : 'random'}`
    ;
  console.log(image)
  return (
    <View style={styles.container}>
        <Image source={{uri: image}} style={styles.image}/>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{club?.fields?.titre}</Text>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.subcategory}>{subCategory}</Text>
        </View>
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
      margin: 5,
      borderRadius: 10,
    },
    image: {
      width: '40%',
      aspectRatio: 1,
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
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