import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SavedScreen from '../screens/SavedScreen';
import DesignDetailScreen from '../screens/DesignDetailScreen';

export default function SavedStackNavigator() {
  return (
      <createNativeStackNavigator.Navigator>
        <createNativeStackNavigator.Screen
          name="SavedList"
          component={SavedScreen}
        />
        <createNativeStackNavigator.Screen
          name="DesignDetail"
          component={DesignDetailScreen}
        />
      </createNativeStackNavigator.Navigator>
  );
}

