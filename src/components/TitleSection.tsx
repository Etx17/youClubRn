import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../themes/colors';
import Entypo from '@expo/vector-icons/Entypo';
import { useAuthContext } from '../contexts/AuthContext';
interface TitleSectionProps {
  title: string;
  onButtonPress?: () => void;
  noBackButton?: boolean;
  isEditButtonPresent?: boolean;
  onEditButtonPress?: () => void;
}

const TitleSection = ({ title, onButtonPress, noBackButton, isEditButtonPresent, onEditButtonPress }:TitleSectionProps) => {
  const { user } = useAuthContext();
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={3}> {title ? title : 'Erreur lors de la récupération du titre'}  </Text> 
      {!noBackButton && (
        <Pressable onPress={onButtonPress} style={styles.goBackButtonContainer}>
        <Ionicons name="chevron-back-outline" size={40} color="black" style={styles.goBackButton} />
      </Pressable>
      )}

      
      {isEditButtonPresent && user.role === 'club' && (
      <Pressable onPress={onEditButtonPress}>
        <Entypo name="edit" size={24} color="black" style={styles.editButton} />
      </Pressable>
      )}
      
    </View>
  );
};
const buttonWidth = 45;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    width: "80%"
  },
  goBackButtonContainer: {
    borderRadius: 50,
  },
  goBackButton: {
    backgroundColor: colors.primary,
    borderRadius: buttonWidth/2,
    width: buttonWidth,
    borderColor: 'black',
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 8,
    position: 'absolute', //Here is the trick
    right: 10,
    bottom: 20,
  },
  editButton: {
    backgroundColor: colors.primary,
    borderRadius: buttonWidth/2,
    width: buttonWidth,
    height: buttonWidth,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
    elevation: 8,
    position: 'absolute', //Here is the trick
    right: 0,
    bottom: 20,
    padding: 2,
  },

});

export default TitleSection;  
