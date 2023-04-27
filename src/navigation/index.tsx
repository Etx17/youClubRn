import {  NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {BottomTabNavigatorParamsList, RootNavigatorParamsList} from '../types/navigation'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BottomTabNavigator from './BottomTabNavigator';
import ClubDetailsScreen from '../screens/ClubDetailsScreen/ClubDetailsScreen';
import TopTabNavigator from './TopTabNavigator';
import colors from '../themes/colors';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntIcons from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
interface ICustomHeaderProps {
    title: string;
    navigation: any;
}

// const insets = useSafeAreaInsets(); 
const Stack = createNativeStackNavigator<RootNavigatorParamsList>()

const CustomHeaderDetails = ({title, navigation}: ICustomHeaderProps) => {
    return (
      <View style={styles.header}>
        
        {/* <Ionicons name="arrow" size={30} color={colors.dark} /> */}
        <Ionicons name="chevron-back-outline" size={30} color={colors.primary} onPress={()=>navigation.goBack()} />
        <Text style={styles.title}>{title}</Text>
        <Text>        </Text>
      </View>
    )
}
const CustomHeader = () => {
    return (
      <View style={styles.header}>
        <Pressable><Ionicons name="location-sharp" size={24} color="black" /></Pressable>
        <Text style={styles.logo}>YOUCLUB.</Text>
        <Pressable><Ionicons name="menu" size={30} color="black" /></Pressable>
      </View>
    )
}

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
                          options={{
                            header: () => <CustomHeader />,
                            // headerTitle: () => <Ionicons name="leaf" size={32} color="green" />,
                            headerTitleAlign: 'center',
                          }}
                      />
                      <Stack.Screen
                          name="ClubDetails"
                        //   options={{ headerTitle: 'Ecologie', headerTitleAlign: 'center' }}
                            options={{
                                header: ({ navigation }) => <CustomHeaderDetails title="Profil" navigation={navigation} />,
                            }}
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
        marginTop: Platform.OS === 'ios' ? 30 : 15,
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
    // gradientText: {
    //     fontSize: 30,
    //     fontWeight: 'bold',
    //     letterSpacing: -2,
    //     color: '#fff',
    //     WebkitMaskImage: 'linear-gradient(to right, #f00, #0f0, #00f)',
    //     maskImage: 'linear-gradient(to right, #f00, #0f0, #00f)',
    //   },
})


export default Navigation;