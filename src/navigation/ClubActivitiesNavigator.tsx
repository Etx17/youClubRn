import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivityDetailsScreen from '../screens/ActivityDetailsScreen/ActivityDetailsScreen';
import EditActivityDetailsScreen from '../screens/EditActivityDetailsScreen/EditActivityDetailsScreen';
import NewSubGroupScreen from '../screens/NewSubGroupScreen/NewSubGroupScreen';
import EditSubGroupScreen from '../screens/EditSubGroupScreen/EditSubGroupScreen';
import NewSubGroupScheduleScreen from '../screens/NewSubGroupScheduleScreen/NewSubGroupScheduleScreen';
import EditSubGroupScheduleScreen from '../screens/EditSubGroupScheduleScreen/EditSubGroupScheduleScreen';
import OwnerClubDetailsScreen from '../screens/OwnerClubDetailsScreen/OwnerClubDetailsScreen';

const Stack = createNativeStackNavigator()

const ClubActivitiesNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <>  
                <Stack.Screen 
                    name="OwnerClubDetails" 
                    component={OwnerClubDetailsScreen} 
                />
                {/* <Stack.Screen 
                    name="NewActivityStack"
                    component={NewActivityStackNavigator}
                /> */}
                <Stack.Screen 
                    name="ActivityDetails" 
                    component={ActivityDetailsScreen} 
                />
                <Stack.Screen
                    name="EditActivityDetails"
                    component={EditActivityDetailsScreen}
                />
                <Stack.Screen
                    name="NewSubGroup"
                    component={NewSubGroupScreen}
                />
                <Stack.Screen
                    name="EditSubGroup"
                    component={EditSubGroupScreen}
                />
                <Stack.Screen
                    name="NewSubGroupSchedule"
                    component={NewSubGroupScheduleScreen}
                />
                <Stack.Screen
                    name="EditSubGroupSchedule"
                    component={EditSubGroupScheduleScreen}
                />

                
            </>
        </Stack.Navigator>
    )
}

export default ClubActivitiesNavigator;