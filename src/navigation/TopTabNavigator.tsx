import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClubsIndexScreen from '../screens/ClubsIndexScreen/ClubsIndexScreen';
import ActivitiesIndexScreen from '../screens/ActivitiesIndexScreen/ActivitiesIndexScreen';
import { TopTabNavigatorParamsList } from '../types/navigation';
import colors from '../themes/colors';
import { useLocationContext } from '../contexts/LocationContext';


const Tab = createMaterialTopTabNavigator<TopTabNavigatorParamsList>();
const TopTabNavigator = () => {
    
      return (
        <Tab.Navigator screenOptions={{
          tabBarStyle: {marginTop: -20, backgroundColor: colors.white, height: 40, position: 'relative', top: 2}, 
          tabBarIndicatorStyle: {backgroundColor: colors.dark, height: 3},
          tabBarLabelStyle: {color: colors.dark, fontSize: 15},
        }}>
          <Tab.Screen 
            name="Clubs" 
            component={ClubsIndexScreen} 
            options={{ swipeEnabled: false, }}
          />
          <Tab.Screen 
            name="Activities" 
            component={ActivitiesIndexScreen} 
            options={{ swipeEnabled: false, }}
          />
        </Tab.Navigator>
      );
    }
    
    export default TopTabNavigator;