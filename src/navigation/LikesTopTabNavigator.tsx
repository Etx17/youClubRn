import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LikesTopTabNavigatorParamsList } from '../types/navigation';
import colors from '../themes/colors';
import LikedActivitiesIndexScreen from '../screens/LikedActivitesIndexScreen/LikedActivitiesIndexScreen';
import LikedClubsNavigator from './LikedClubsNavigator';

const Tab = createMaterialTopTabNavigator<LikesTopTabNavigatorParamsList>();
const LikesTopTabNavigator = () => {
    
      return (
        <Tab.Navigator screenOptions={{
          tabBarStyle: {marginTop: -20, backgroundColor: colors.white, height: 40, position: 'relative', top: 2}, 
          tabBarIndicatorStyle: {backgroundColor:colors.dark},
          tabBarLabelStyle: {color: colors.dark, fontSize: 15, letterSpacing: 2},
        }}>
          <Tab.Screen 
            name="Clubs" 
            component={LikedClubsNavigator} 
            options={{ swipeEnabled: false, }}
          />
          <Tab.Screen 
            name="Activités" 
            component={LikedActivitiesIndexScreen} 
            options={{ swipeEnabled: false }}
          />
        </Tab.Navigator>
      );
    }
    
    export default LikesTopTabNavigator;