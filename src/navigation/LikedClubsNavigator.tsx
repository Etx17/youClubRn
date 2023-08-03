import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClubDetailsScreen from '../screens/ClubDetailsScreen/ClubDetailsScreen';
import LikedClubsIndexScreen from '../screens/LikedClubsIndexScreen/LikedClubsIndexScreen';
import React from 'react';

const Stack = createNativeStackNavigator()

const LikedClubsNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <>
                <Stack.Screen 
                    name="LikedClubsIndex" 
                    component={LikedClubsIndexScreen} 
                />
                <Stack.Screen
                    name="ClubDetails"
                    component={ClubDetailsScreen}
                />
                
            </>
        </Stack.Navigator>
    )
}

export default LikedClubsNavigator;