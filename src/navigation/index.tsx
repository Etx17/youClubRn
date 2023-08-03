import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootNavigatorParamsList} from '../types/navigation'
import BottomTabNavigator from './BottomTabNavigator';
import ClubDetailsScreen from '../screens/ClubDetailsScreen/ClubDetailsScreen';
import colors from '../themes/colors';
import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import React from 'react'
import ActivityDetailsScreen from '../screens/ActivityDetailsScreen/ActivityDetailsScreen';
import ClubBottomTabNavigator from './ClubBottomTabNavigator';
import { useAuthContext } from '../contexts/AuthContext';
import { LocationPicker } from '../components/LocationPicker';
import { useLocationContext } from '../contexts/LocationContext';
import * as Location from 'expo-location';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

type Location = {
    latitude: number;
    longitude: number;
};
const prefix = Linking.createURL('/');
const Stack = createNativeStackNavigator<RootNavigatorParamsList>();

const CustomHeader = () => {
    const { updateLocation } = useLocationContext();
    const [currentCity, setCurrentCity] = React.useState<string | null>('');
    const handleLocationSelected = async (location: Location) => {
        // updateLocation(newLocation, newCity, newRegion, newSubregion);
        // Update the context
        Location.reverseGeocodeAsync(location).then((response) => {
           console.log(response[0]);

            const newLocation = {
                coords: {
                latitude: location.latitude,
                longitude:location.longitude
                }
            };
            updateLocation(newLocation, response[0].postalCode, response[0].city, response[0].region, response[0].subregion);

            setCurrentCity(response[0].city);
        });


      };

    return (
      <View style={styles.header}>
        <Image source={require('../assets/images/logoyouclub.png')} style={{width: 100, height: 25}} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: colors.grayDarkest}}>{currentCity}</Text>
            <LocationPicker onLocationSelected={handleLocationSelected} />
        </View>
      </View>
    )
}



const Navigation = () => {
    const linking = {
      prefixes: [prefix],
    };
    const {user} = useAuthContext();

        return(
          <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <Stack.Navigator screenOptions={{headerShown: true}} >

                {!user || user.role === "user" ? (
                    <>
                      <Stack.Screen
                          name="Home"
                          component={BottomTabNavigator}
                          options={{
                            header: () => <CustomHeader />,
                            headerTitleAlign: 'center',
                          }}
                      />
                      <Stack.Screen
                          name="ClubDetails"
                          options={{ headerShown: false, }}
                          component={ClubDetailsScreen}
                      />
                      <Stack.Screen
                          name="ActivityDetails"
                          options={{ headerShown: false, }}
                          component={ActivityDetailsScreen}
                      />

                    </>

                ) : (
                    user.role === "club" && (
                        <Stack.Screen
                            name="ClubHome"
                            component={ClubBottomTabNavigator}
                            options={{
                            // header: () => <CustomClubHeader />,
                            headerShown: false,
                            headerTitleAlign: 'center',
                            }}
                        />
                    )

                )}


            </Stack.Navigator>
          </NavigationContainer>
        )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        marginTop: Platform.OS === 'ios' ? 25 : 10,
        paddingHorizontal: 10,
        height: 40,
        color: colors.grayDarkest
    },
    clubHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.black,
        marginTop: Platform.OS === 'ios' ? 25 : 0,
        paddingHorizontal: 10,
        height: 60,
        color: colors.grayDarkest
    },
    title: {
        fontSize: 20,
        color: colors.dark,
    },
    logo: {
       color: colors.dark,
       fontSize: 30,
       fontWeight: 'bold',
       letterSpacing: -2,
    },
})

export default Navigation;
