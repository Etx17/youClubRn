import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../themes/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection= ({ description }:DescriptionSectionProps) => {

  return (
    <>
      <Text style={styles.title}>DESCRIPTION</Text>
      <Text style={styles.description}>{description} </Text>
        
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.grayDark,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: colors.grayDarkest,
    paddingVertical: 10,
  },
});

export default DescriptionSection;
