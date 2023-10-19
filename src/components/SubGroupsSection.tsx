import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '../themes/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

interface SubGroupsProps {
  subGroups: string[];
  activityId: string;
}
// For now activities are just strings, but they are meant to be objects with a name and an id
const SubGroupsSection = (subGroups, activityId) => {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const subGroupsArray = subGroups.subGroups;
  return (
    <View>
      <Text style={{ color: colors.grayDark, fontWeight: 'bold', marginTop: 10 }}>Sous-groupes:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {subGroupsArray && subGroupsArray?.map((subGroup, index) => (
            <LinearGradient key={index} start={[0, 0]} end={[1, 0]} colors={[colors.secondary, colors.primary] } style={styles.tag}>
              <Text>
                {subGroup.name}
              </Text>
            </LinearGradient>
        ))}
        {/* {user?.role === 'club' && (
          <Pressable onPress={() => navigation.navigate('NewSubGroup', {activityId: activityId, refetchActivityData: refetchActivityData()})} style={styles.addActivityButton}>
              <Text style={{fontSize: 17, color: colors.primary}}> + Ajouter</Text>
          </Pressable>
        )} */}

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
    fontSize: 14,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    borderColor: colors.primary,
    borderWidth: 1,
    width: "auto",
    marginHorizontal: 4,
    paddingEnd: 16,
  },
});

export default SubGroupsSection;
