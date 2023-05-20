import React from 'react'
import { View, Text, Button, StyleSheet, Pressable, Alert } from 'react-native';
import categoryImagesJson from '../assets/data/categoryImages.json';
import {Image} from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntIcons from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import colors from '../themes/colors';
interface ILikedClubCardProps {
    club: {
      fields: {
        id: string;
        titre: string;
        domaine_activite_libelle_categorise: string;
      }
    };
    onUnLike: (id: string) => void;
}
interface CategoryImages {
  [category: string]: {
    [subCategory: string]: string[] | string;
  };
}
const categoryImages: CategoryImages = categoryImagesJson;

const LikedClubCard = ({ club, onUnLike }: ILikedClubCardProps) => {
    const domaine_activite_libelle_categorise = club?.fields?.domaine_activite_libelle_categorise;
    const subCategory = domaine_activite_libelle_categorise ? domaine_activite_libelle_categorise.split('/')[1].split('###')[0].charAt(0).toUpperCase() + domaine_activite_libelle_categorise.split('/')[1].split('###')[0].slice(1) : 'Autre/Non renseigné';
    const category = domaine_activite_libelle_categorise ? domaine_activite_libelle_categorise.split('/')[0].split('###')[0].charAt(0).toUpperCase() + domaine_activite_libelle_categorise.split('/')[0].split('###')[0].slice(1) : 'Autre/Non renseigné';
    const images = [
      `https://source.unsplash.com/random/?${categoryImages[category] ? categoryImages[category][subCategory][0] : 'random'}/400/300`,
      `https://source.unsplash.com/random/?${categoryImages[category] ? categoryImages[category][subCategory][1] : 'random'}/400/300`,
    ];
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <Image source={{uri: images[0]}} style={styles.image}/>
          <View style={styles.textContainer}>
            <Text numberOfLines={2} style={styles.title}>{club?.fields?.titre}</Text>
            <Text style={styles.category} numberOfLines={2}>{category}</Text>
            <Text style={styles.subcategory}>{subCategory}</Text>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                <Pressable onPress={() => Alert.alert(
                  "Supprimer",
                  "Voulez vous vraiment supprimer ce club de vos favoris?",
                  [ { text: "Annuler", style: "cancel", }, { text: "Oui", onPress: () => onUnLike(club?.fields?.id), }, ] )} 
                >
                  <Entypo name="cross" size={40} color={colors.grayDarkest} style={{ textAlign: 'center'  }} />
                </Pressable>

                <Pressable onPress={() => navigation.navigate('ClubDetails', {clubData: club.fields, images, darkTheme: false})}>
                  <AntIcons name="arrowright" size={40} color={colors.dark} style={{ textAlign: 'center'  }} />
                </Pressable>
                
            </View>
          </View>
   </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1.3,
      backgroundColor: colors.primary,
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
      padding: 8,
      justifyContent: 'space-around',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.dark
    },
    category: {
      fontSize: 14,
    },
    subcategory: {
      fontSize: 12,
    },
  });
export default LikedClubCard
