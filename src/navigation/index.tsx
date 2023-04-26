import {  NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {BottomTabNavigatorParamsList, RootNavigatorParamsList} from '../types/navigation'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BottomTabNavigator from './BottomTabNavigator';
import ClubDetailsScreen from '../screens/ClubDetailsScreen/ClubDetailsScreen';
import TopTabNavigator from './TopTabNavigator';

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