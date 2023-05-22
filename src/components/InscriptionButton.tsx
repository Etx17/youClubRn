import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import colors from '../themes/colors';

interface InscriptionButtonProps {
  onPress: () => void;
}

const InscriptionButton = ({ onPress }: InscriptionButtonProps) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress} style={styles.signUpButtonDisabled}>
                <Text style={{color: colors.black}}>M'inscrire</Text>
            </Pressable>
        </View>
    );
};

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    signUpButton: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16,
      marginVertical: 10,
      overflow: 'hidden',
      elevation: 8,
    },
    signUpButtonDisabled: {
      backgroundColor: colors.dark,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      color: colors.grayLight,
      fontWeight: 'bold',
      fontSize: 16,
      marginVertical: 10,
      overflow: 'hidden',
      elevation: 8,
    },
  });
  
  export default InscriptionButton;