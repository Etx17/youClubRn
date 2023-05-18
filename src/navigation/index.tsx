import {  NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {BottomTabNavigatorParamsList, RootNavigatorParamsList} from '../types/navigation'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';
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
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');
interface ICustomHeaderProps {
    title: string;
    navigation: any;
}

// const insets = useSafeAreaInsets();
const Stack = createNativeStackNavigator<RootNavigatorParamsList>()

const CustomHeaderDetails = ({title, navigation}: ICustomHeaderProps) => {
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.customHeader}>

      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={30} color={colors.primaryLight} onPress={()=>navigation.goBack()} />
        <Text style={{fontSize: 20, color: colors.grayDarkest,}}>{title}</Text>
        <Text>        </Text>
      </View>
        </LinearGradient>
    )
}
const CustomHeader = () => {
    return (
      <View style={styles.header}>
        <Pressable><Ionicons name="location-sharp" size={24} color="transparent" /></Pressable>
        <Image source={require('../assets/images/logoyouclub.png')} style={{width: 130, height: 30}} />
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
                            options={{
                                headerShown: false,
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
        marginTop: Platform.OS === 'ios' ? 25 : 15,
        paddingHorizontal: 10,
        height: 50,
    },
    customHeader: {
        flex: 1,
        // alignSelf: 'stretch',
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
