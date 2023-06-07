import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../themes/colors';
import {BottomTabNavigatorParamsList} from "../types/navigation"
import AntIcons from '@expo/vector-icons/AntDesign';
import TopTabNavigator from './TopTabNavigator';
import LikesTopTabNavigator from './LikesTopTabNavigator';
import React from 'react';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamsList>();
const BottomTabNavigator = () => {
    return (
        
        <Tab.Navigator 
            screenOptions={{
                tabBarShowLabel: false, 
                tabBarActiveTintColor: colors.dark,
                tabBarInactiveTintColor: colors.grayDarkest,
            }}
        >
            <Tab.Screen 
                name="HomeTab" 
                component={TopTabNavigator} 
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: colors.white,
                  },
                  tabBarIcon: ({color}) => 
                      <AntIcons name="home" size={24} color={color}  />
                }}
             />
             
            <Tab.Screen 
                name="Likes" 
                component={LikesTopTabNavigator} 
                options={{
                  headerShown: false,
                  tabBarIcon: ({color}) => <AntIcons name="hearto" size={24} color={color}  />,
                }}
            />

            {/* <Tab.Screen 
                name="MyProfile" 
                component={MyProfileScreen} 
                options={{
                  headerShown: false,
                  tabBarIcon: ({color}) => <AntIcons name="user" size={24} color={color}  />,
                  tabBarButton: (props) => ( <Pressable {...props} onPress={() => { Alert.alert('Bientôt disponible') }} style={props.style} /> ),
                }}
            /> */}

        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
