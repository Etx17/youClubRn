import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../themes/colors';
import {BottomTabNavigatorParamsList} from "../types/navigation"
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AntIcons from '@expo/vector-icons/AntDesign';
import LikesScreen from '../screens/LikesScreen/LikesScreen';
import { Pressable, Alert } from 'react-native';
import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamsList>();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false, 
            tabBarActiveTintColor: colors.black,
        }}>
            <Tab.Screen 
                name="HomeTab" 
                component={HomeScreen} 
                options={{
                  headerShown: false,
                  /* headerStyle: {
                    height: 30, // Specify the height of your custom header
                  }, */
                  tabBarIcon: () => 
                      <AntIcons name="home" size={24} color="black"  />
                }}
             />
             
            <Tab.Screen 
                name="Likes" 
                component={LikesScreen} 
                options={{
                  headerShown: false,
                  tabBarIcon: () => <AntIcons name="hearto" size={24} color="lightgrey"  />,
                  tabBarButton: (props) => ( <Pressable {...props} onPress={() => { Alert.alert('Bientôt disponible') }} style={props.style} /> ),
                }}
            />

            <Tab.Screen 
                name="MyProfile" 
                component={MyProfileScreen} 
                options={{
                  headerShown: false,
                  tabBarIcon: () => <AntIcons name="user" size={24} color="lightgrey"  />,
                  tabBarButton: (props) => ( <Pressable {...props} onPress={() => { Alert.alert('Bientôt disponible') }} style={props.style} /> ),
                }}
            />

        </Tab.Navigator>
    );
};

export default BottomTabNavigator;