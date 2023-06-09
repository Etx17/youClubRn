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

const prefix = Linking.createURL('/');

const Stack = createNativeStackNavigator<RootNavigatorParamsList>();

const CustomHeader = () => {
    return (
      <View style={styles.header}>
        {/* <Pressable><Ionicons name="location-sharp" size={24} color="transparent" /></Pressable> */}
        <Image source={require('../assets/images/logoyouclub.png')} style={{width: 100, height: 25}} />
        <Pressable><Ionicons name="menu" size={30} color="black" /></Pressable>
      </View>
    )
}

const Navigation = () => {
    const linking = {
      prefixes: [prefix],
    };
    // const {user} = useAuthContext();

    // if(user === undefined) {
        return(
            <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <Stack.Navigator screenOptions={{headerShown: true}} >

                {/* {!user ? (
                    <Stack.Screen
                        name="Auth"
                        component={AuthStackNavigator}
                        options={{headerShown: false}}
                    />
                ) : ( */}
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

                    </>

                {/* )} */}


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
        marginTop: Platform.OS === 'ios' ? 25 : 15,
        paddingHorizontal: 10,
        height: 50,
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
