import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SavedScreen from '../screens/SavedScreen';
import DesignDetailScreen from '../screens/DesignDetailScreen';

let stack = createNativeStackNavigator();

export default function SavedStackNavigator() {
  return (
      <stack.Navigator>
        <stack.Screen
          name="SavedList"
          component={SavedScreen}
        />
        <stack.Screen
          name="DesignDetail"
          component={DesignDetailScreen}
        />
      </stack.Navigator>
  );
}

