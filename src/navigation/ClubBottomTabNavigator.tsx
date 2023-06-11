import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ClubBottomTabNavigatorParamsList} from '../types';
import colors from '../themes/colors';
import React from 'react';
import ClubDetailsScreen from '../screens/ClubDetailsScreen/ClubDetailsScreen';
import EditClubScreen from '../screens/EditClubScreen/EditClubScreen';
import NewActivityScreen from '../screens/NewActivityScreen/NewActivityScreen';
import ClubActivitiesNavigator from './ClubActivitiesNavigator';
import OwnerClubDetailsScreen from '../screens/OwnerClubDetailsScreen/OwnerClubDetailsScreen';
import ClubAccountScreen from '../screens/ClubAccountScreen/ClubAccountScreen';

const Tab = createBottomTabNavigator<ClubBottomTabNavigatorParamsList>();
const ClubBottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: true, 
                tabBarActiveTintColor: colors.white,
                tabBarInactiveTintColor: colors.dark,
                tabBarActiveBackgroundColor: colors.black,
                tabBarInactiveBackgroundColor: colors.black,
            }}
        >
            <Tab.Screen
                name="ClubActivitiesNavigator"
                component={ClubActivitiesNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Account"
                component={ClubAccountScreen}
            />
        </Tab.Navigator>
    );
            

};

export default ClubBottomTabNavigator;
