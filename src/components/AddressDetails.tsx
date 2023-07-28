import React from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../themes/colors';

interface AddressDetailsProps {
    address: string;
    postalCode: string;
}

const AddressDetails = ({ address, postalCode }:AddressDetailsProps) => {
    const handlePress = () => {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
    };

    return (
      <View style={styles.container}>
        <Text style={styles.seeMore} onPress={handlePress}>
          <Ionicons name="location-sharp" size={14} color={colors.primary} /> {address.substring(0, 30)}{address.length > 30 ? `...` : ''}
        </Text>
        <Text style={styles.postalCode}>{postalCode}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      fontSize: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    address: {
      color: 'white',
    },
    seeMore: {
      color: colors.info,
    },
    postalCode: {
      color: 'white',
    },
  });

  export default AddressDetails;
