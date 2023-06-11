import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '../themes/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert } from 'react-native';

interface SubGroupsProps {
  subGroups: string[];

}
// For now activities are just strings, but they are meant to be objects with a name and an id
const SubGroupsSection = ({ subGroups}:SubGroupsProps) => {
  const role = 'club' // mocking role
  return (
    <View>
      <Text style={{ color: colors.grayDark, fontWeight: 'bold', marginTop: 10 }}>Sous-groupes:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {subGroups.map((subGroup, index) => (
            <LinearGradient start={[0, 0]} end={[1, 0]} colors={[colors.secondary, colors.primary] } style={styles.tag}> 
              <Text key={index}>
                {subGroup}
              </Text>
            </LinearGradient>
        ))}
        {role === 'club' && (
          <Pressable onPress={() => Alert.alert("Redirigera vers CreateSubGroupScreen en passant l'id de l'activité parente")} style={styles.addActivityButton}>
              <Text style={{fontSize: 24, color: colors.primary,}}> + </Text>
          </Pressable>
        )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    marginTop: 10,
    fontSize: 14,
    color: colors.dark,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 14,
    overflow: 'hidden',
    borderColor: colors.violetLighter,
    borderWidth: 1,
    backgroundColor: colors.primary,
    width: "auto",
    marginHorizontal: 4,
  },
  addActivityButton: {
    marginTop: 10,
    fontSize: 24,
    paddingVertical: 0,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    borderColor: colors.primary,
    borderWidth: 1,
    // backgroundColor: colors.primary,
    width: "100%",
    marginHorizontal: 4,
  },
});

export default SubGroupsSection;
