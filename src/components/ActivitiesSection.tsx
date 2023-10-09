import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import colors from '../themes/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthContext } from '../contexts/AuthContext';

interface ActivitiesSectionProps {
  activities: [];
}
// For now activities are just strings, but they are meant to be objects with a name and an id
const ActivitiesSection = ({ activities }:ActivitiesSectionProps) => {
  // const {user} = useAuthContext();
  // console.log(user?.role)
  return (
    <View>
      <Text style={{ color: colors.grayDark, fontWeight: 'bold', marginTop: 10 }}>ACTIVITÉS:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {activities.map((activity, index) => (
          <LinearGradient start={[0, 0]} end={[1, 0]} colors={[colors.secondary, colors.primary] } style={styles.tag}>
            <Text key={index}>
              {activity}
            </Text>
          </LinearGradient>
        ))}

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
});

export default ActivitiesSection;
