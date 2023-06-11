import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../themes/colors';
import Entypo from '@expo/vector-icons/Entypo';
interface TitleSectionProps {
  title: string;
  onButtonPress?: () => void;
}

const TitleSection = ({ title, onButtonPress }:TitleSectionProps) => {
  // const role = 'club' // mocking role
  const role = false 
  return (
    <View style={styles.container}>
        <Text style={styles.title} numberOfLines={3}> {title ? title : 'Erreur lors de la récupération du titre'}  </Text> 
      {role != 'club' && (
      <Pressable onPress={onButtonPress} style={styles.goBackButtonContainer}>
        <Ionicons name="chevron-back-outline" size={40} color="black" style={styles.goBackButton} />
      </Pressable>
      )}
      {role === 'club' && (
      <Pressable onPress={onButtonPress} style={styles.goBackButtonContainer}>
        <Entypo name="new-message" size={40} color="black" style={styles.editButton} />
      </Pressable>
      )}
    </View>
  );
};
const buttonWidth = 45;
const buttonWidth2 = 60;
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
    borderRadius: buttonWidth2/2,
    width: buttonWidth2,
    height: buttonWidth2,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'black',
    borderWidth: 0,
    overflow: 'hidden',
    elevation: 8,
    position: 'absolute', //Here is the trick
    right: 10,
    bottom: 20,
    padding: 2,
  },

});

export default TitleSection;  
