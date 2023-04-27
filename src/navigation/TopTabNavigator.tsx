import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ClubsIndexScreen from '../screens/ClubsIndexScreen/ClubsIndexScreen';
import ActivitiesIndexScreen from '../screens/ActivitiesIndexScreen/ActivitiesIndexScreen';
import { TopTabNavigatorParamsList } from '../types/navigation';
import colors from '../themes/colors';


const Tab = createMaterialTopTabNavigator<TopTabNavigatorParamsList>();
const TopTabNavigator = () => {

    const insets = useSafeAreaInsets(); //for iphone notch and android cutouts
    
      return (
        <Tab.Navigator screenOptions={{
          tabBarStyle: {marginTop: -20, backgroundColor: colors.white, height: 40, position: 'relative', top: 2}, 
          tabBarIndicatorStyle: {backgroundColor:colors.dark},
          tabBarLabelStyle: {color: colors.dark},
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