import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Image } from 'react-native';
// import instalogo from '../assets/images/instalogo.png';
import {BottomTabNavigatorParamsList, RootNavigatorParamsList} from '../types/navigation'
// import AuthStackNavigator from './AuthStackNavigator';
// import { useAuthContext } from '../contexts/AuthContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { View, ActivityIndicator } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import ClubDetailsScreen from '../screens/ClubDetailsScreen/ClubDetailsScreen';
const Tab = createBottomTabNavigator<BottomTabNavigatorParamsList>();
const Stack = createNativeStackNavigator<RootNavigatorParamsList>();
const Navigation = () => {
    // const {user} = useAuthContext();

    // if(user === undefined) {
        return(
            <NavigationContainer >
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
                          options={{headerShown: false}} 
                      />
                      <Stack.Screen
                          name="ClubDetails"
                          component={ClubDetailsScreen}
                      />
                    </>

                {/* )} */}

                
            </Stack.Navigator>
        </NavigationContainer>
        )
 
}



export default Navigation;