import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ClubsIndexScreen from '../screens/ClubsIndexScreen/ClubsIndexScreen';
import ActivitiesIndexScreen from '../screens/ActivitiesIndexScreen/ActivitiesIndexScreen';
import EventsIndexScreen from '../screens/EventsIndexScreen/EventsIndexScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntIcons from '@expo/vector-icons/AntDesign';
import { TopTabNavigatorParamsList } from '../types/navigation';
// import ClubIndexScreen from '../screens/ClubIndexScreen/ClubIndexScreen';
// import ActivityIndexScreen from '../screens/ActivityIndexScreen/ActivityIndexScreen';
// import EventIndexScreen from '../screens/EventIndexScreen/EventIndexScreen';
// import colors from /*  */
// import { SearchTabTabNavigatorParamsList } from '../types/navigation';

const Tab = createMaterialTopTabNavigator<TopTabNavigatorParamsList>();
const TopTabNavigator = () => {

    const insets = useSafeAreaInsets(); //for iphone notch and android cutouts
    
      return (
        <Tab.Navigator screenOptions={{
          tabBarStyle: {paddingTop: insets.top}, 
          tabBarIndicatorStyle: {backgroundColor:'black'},
        }}>
            <Tab.Screen 
                name="Clubs" 
                component={ClubsIndexScreen} 
                options={{
                    swipeEnabled: false,
                }}
            />
            <Tab.Screen 
                name="Activities" 
                component={ActivitiesIndexScreen} 
                options={{
                    swipeEnabled: false,
                }}
            />
           
        </Tab.Navigator>
      );
    }
    
    export default TopTabNavigator;