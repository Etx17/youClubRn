import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ActivityIndicator, TouchableHighlight, TouchableOpacity } from 'react-native';
import colors from '../themes/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

interface ActivitiesSectionProps {
  activities: [{id: string, name: string}];
}
// For now activities are just strings, but they are meant to be objects with a name and an id
const ActivitiesSection = ({ activities }:ActivitiesSectionProps) => {
  const navigation = useNavigation()
  return (
    <View>
      <Text style={{ color: colors.grayDark, fontWeight: 'bold', marginTop: 10 }}>ACTIVITÉS:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        { activities.length > 0 ? (
          activities.map((activity, index) => (
          <TouchableOpacity key={index} style={styles.tag} onPress={()=> {navigation.navigate('ActivityDetails', {activityId: activity.id})}}>
            <Text >
              {activity.name}
            </Text>
          </TouchableOpacity>
          ))) : (
            <Text style={{ color: colors.grayDark, marginTop: 10 }}>Ce club n'a pas encore renseigné d'activité</Text>
          )
        }

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
