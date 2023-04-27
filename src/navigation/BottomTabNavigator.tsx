import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../themes/colors';
import {BottomTabNavigatorParamsList} from "../types/navigation"
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AntIcons from '@expo/vector-icons/AntDesign';
import LikesScreen from '../screens/LikesScreen/LikesScreen';
import { Pressable, Alert } from 'react-native';
import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen';
import TopTabNavigator from './TopTabNavigator';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamsList>();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarShowLabel: false, 
                tabBarActiveTintColor: colors.dark,
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

// Bonsoir tout le monde,
// Pour mon projet perso, je rencontre un petit souci avec mon bottomTabNavigator, et je vais essayer de le décrire avant de joindre du code. 

// Lorsque je set le headerShown: true pour le tabScreen que vous voyez (:house:), ce header pousse mon deck de cartes (placé lui même dans un des deux tabs de mon TopTapNavigator) sous la barre de navigation.

// J'aurais aimé que le flex: 1 de mon composant de carte puisse prendre toute la place disponible en étant limité par mon bottomTabNavigator en bas, et mon topTabNavigator en haut, sauf qu'il ne sont pas aux même "étages".

// J'imagine que mon BottomTabNavigator se trouve au dessus dans la pile de composants, mais je me demandais s'il y avait un moyen pour que l'espace qu'il occupe puisse être interprêté par le screen de mon topTabNavigator qui contient ces cartes et ces dropdpwnpickers. Autrement dit, qu'en gardant mon flex:1 sur ma carte, que celle ci descende jusqu'à toucher mon bottomTab, comme ça je n'ai plus qu'a mettre le padding que je veux, mais qu'elle ne glisse pas en dessous.

// Je suis pas vraiment satisfait du monkeypatch que j'ai actuellement qui consiste à set une maxHeight sur cette carte, ca donne un espace vide immonde sous android.

// J'ai envisagé de mettre un élément avec une hauteur de la taille du la barre de tabs en position absolute en bas du screen qui contient mon deck de carte afin que le flex:1 de celui ci vienne buter dessus, mais j'aurais voulu savoir s'il y existe une solution un peu plus élégante, soucieux des bonnes pratiques.

// Ci joints quelques screens.