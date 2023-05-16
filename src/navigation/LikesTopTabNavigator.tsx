import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClubsIndexScreen from '../screens/ClubsIndexScreen/ClubsIndexScreen';
import ActivitiesIndexScreen from '../screens/ActivitiesIndexScreen/ActivitiesIndexScreen';
import { LikesTopTabNavigatorParamsList } from '../types/navigation';
import colors from '../themes/colors';
import { useLocationContext } from '../contexts/LocationContext';
import LikedActivitiesIndexScreen from '../screens/LikedActivitesIndexScreen/LikedActivitiesIndexScreen';
import LikedClubsIndexScreen from '../screens/LikedClubsIndexScreen/LikedClubsIndexScreen';
import LikedClubsNavigator from './LikedClubsNavigator';

const Tab = createMaterialTopTabNavigator<LikesTopTabNavigatorParamsList>();
const LikesTopTabNavigator = () => {
    
      return (
        <Tab.Navigator screenOptions={{
          tabBarStyle: {marginTop: -20, backgroundColor: colors.white, height: 40, position: 'relative', top: 2}, 
          tabBarIndicatorStyle: {backgroundColor:colors.dark},
          tabBarLabelStyle: {color: colors.dark},
        }}>
          <Tab.Screen 
            name="Clubs" 
            // component={LikedClubsIndexScreen} 
            component={LikedClubsNavigator} 
            options={{ swipeEnabled: false, }}
          />
          <Tab.Screen 
            name="Activities" 
            component={LikedActivitiesIndexScreen} 
            options={{ swipeEnabled: false, }}
          />
        </Tab.Navigator>
      );
    }
    
    export default LikesTopTabNavigator;