import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DrawScreen from './src/screens/DrawScreen';
import SavedScreen from './src/screens/SavedScreen';
import { COLORS } from './src/constants/theme';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//Done TODO (Task 1): Replace this with React Navigation.
//   - Wrap the app in <NavigationContainer>.
//   - Create a bottom tab navigator with two tabs:
//       "Draw"  -> DrawScreen
//       "Saved" -> a stack navigator (see Task 2)
//   - The tab navigator draws its own header and handles safe areas,
//     so you can remove the SafeAreaView and the header below.

export default function App() {
  let drawIcon = ({ focused, color, size }) => (
    <Ionicons name={focused ? 'brush' : 'brush-outline'} size={size} color={color} />
  );

  let savedIcon = ({ focused, color, size }) => (
    <Ionicons name={focused ? 'bookmark' : 'bookmark-outline'} size={size} color={color} />
  );

  const TAB = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <TAB.Navigator>
        <TAB.Screen name="Draw" component={DrawScreen} options={{ tabBarIcon: drawIcon }} />
        <TAB.Screen name="Saved" component={SavedScreen} options={{ tabBarIcon: savedIcon , headerShown: false }} />
      </TAB.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.ink,
  },
});
