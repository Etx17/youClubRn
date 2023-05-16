import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import ClubDetailsScreen from '../screens/ClubDetailsScreen/ClubDetailsScreen';
import LikedClubsIndexScreen from '../screens/LikedClubsIndexScreen/LikedClubsIndexScreen';



const Stack = createNativeStackNavigator()

const LikedClubsNavigator = () => {
    // const {user} = useAuthContext();

    // if(user === undefined) {
        return(
            <Stack.Navigator screenOptions={{headerShown: false}} >

                {/* {!user ? (
                    <Stack.Screen 
                        name="Auth" 
                        component={AuthStackNavigator} 
                        options={{headerShown: false}} 
                    />
                ) : ( */}
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

                {/* )} */}

                
            </Stack.Navigator>
        )
}



export default LikedClubsNavigator;