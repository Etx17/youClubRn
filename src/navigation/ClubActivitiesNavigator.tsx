import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivityDetailsScreen from '../screens/ActivityDetailsScreen/ActivityDetailsScreen';
import EditActivityDetailsScreen from '../screens/EditActivityDetailsScreen/EditActivityDetailsScreen';
import NewSubGroupScreen from '../screens/NewSubGroupScreen/NewSubGroupScreen';
import EditSubGroupScreen from '../screens/EditSubGroupScreen/EditSubGroupScreen';
import NewSubGroupScheduleScreen from '../screens/NewSubGroupScheduleScreen/NewSubGroupScheduleScreen';
import EditSubGroupScheduleScreen from '../screens/EditSubGroupScheduleScreen/EditSubGroupScheduleScreen';
import OwnerClubDetailsScreen from '../screens/OwnerClubDetailsScreen/OwnerClubDetailsScreen';
import EditClubScreen from '../screens/EditClubScreen/EditClubScreen';
import NewActivityScreen from '../screens/NewActivityScreen/NewActivityScreen';

const Stack = createNativeStackNavigator()

const ClubActivitiesNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{
            statusBarColor: 'black', 
            headerBlurEffect: 'dark',
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTintColor: 'white',
        }}>
            <>  
            <Stack.Screen 
                name="OwnerClubDetails" 
                component={OwnerClubDetailsScreen} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="NewActivity"
                component={NewActivityScreen}
                options={{
                    title: 'Nouvelle Activité', // French title for "New Activity"
                }}
            />
            <Stack.Screen 
                name="EditClub" 
                component={EditClubScreen} 
                options={{
                    title: 'Modifier le Club', // French title for "Edit Club"
                }}
            />
            <Stack.Screen 
                name="ActivityDetails" 
                component={ActivityDetailsScreen} 
                options={{
                    title: 'Détails de l\'activité', // French title for "Activity Details"
                }}
            />
            <Stack.Screen
                name="EditActivityDetails"
                component={EditActivityDetailsScreen}
                options={{
                    title: 'Modifier l\'activité', // French title for "Edit Activity Details"
                }}
            />
            <Stack.Screen
                name="NewSubGroup"
                component={NewSubGroupScreen}
                options={{
                    title: 'Nouveau Sous-Groupe', // French title for "New Subgroup"
                }}
            />
            <Stack.Screen
                name="EditSubGroup"
                component={EditSubGroupScreen}
                options={{
                    title: 'Modifier le Sous-Groupe', // French title for "Edit Subgroup"
                }}
            />
            <Stack.Screen
                name="NewSubGroupSchedule"
                component={NewSubGroupScheduleScreen}
                options={{
                    title: 'Ajouter un horaire', // French title for "New Subgroup Schedule"
                }}
            />
            <Stack.Screen
                name="EditSubGroupSchedule"
                component={EditSubGroupScheduleScreen}
                options={{
                    title: 'Modifier l\'horaire de Sous-Groupe', // French title for "Edit Subgroup Schedule"
                }}
            />

                
            </>
        </Stack.Navigator>
    )
}

export default ClubActivitiesNavigator;