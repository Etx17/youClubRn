import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ClubBottomTabNavigatorParamsList} from '../types';
import colors from '../themes/colors';
import React from 'react';
import ClubActivitiesNavigator from './ClubActivitiesNavigator';
import ClubAccountScreen from '../screens/ClubAccountScreen/ClubAccountScreen';
import AntIcons from '@expo/vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<ClubBottomTabNavigatorParamsList>();
const ClubBottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.dark,
                tabBarActiveBackgroundColor: colors.dark,
                tabBarInactiveBackgroundColor: colors.black,
                tabBarStyle: {
                    borderTopColor: 'white',
                    height: 50 + insets.bottom,
                    paddingBottom: insets.bottom,

                },
            }}
        >
            <Tab.Screen
                name="ClubActivitiesNavigator"

                component={ClubActivitiesNavigator}
                options={{
                  headerShown: false,
                  tabBarIcon: ({color}) =>
                    <AntIcons name="home" size={24} color={color}  />
                }}
            />
            <Tab.Screen
                name="Votre compte"
                component={ClubAccountScreen}
                options={{
                  headerShown: true,
                  tabBarIcon: ({color}) =>
                    <AntIcons name="user" size={24} color={color}  />
                }}
            />
        </Tab.Navigator>
    );


};

export default ClubBottomTabNavigator;
