import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../themes/colors';

interface TitleSectionProps {
  title: string;
  onBackPress: () => void;
}

const TitleSection = ({ title, onBackPress }:TitleSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={3}>{title ? title : 'Erreur lors de la récupération du titre'}</Text>
      <Pressable onPress={onBackPress} style={styles.goBackButtonContainer}>
        <Ionicons name="chevron-back-outline" size={40} color="black" style={styles.goBackButton} />
      </Pressable>
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
});

export default TitleSection;  
