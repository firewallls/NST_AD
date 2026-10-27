import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import DesignCard from '../components/DesignCard';
import { COLORS } from '../constants/theme';

// The list of saved designs. This is the first screen of the "Saved" tab's stack.
export default function SavedScreen({ navigation }) {
  const [designs, setDesigns] = useState([]);

  // TODO (Task 3): Load the designs with getDesigns() and put them in state.
  // Hint: a tab screen stays mounted when you switch tabs, so a plain
  // useEffect runs only once. Use useFocusEffect from @react-navigation/native
  // to reload the list every time the tab is opened.

  const openDesign = (design) => {
    // TODO (Task 2): Navigate to the "DesignDetail" screen
    // and pass the design's id as a route param.
    navigation.navigate('DesignDetail', { route: design.id });
  };

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.list}
      data={designs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DesignCard design={item} onPress={() => openDesign(item)} />}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No saved designs yet</Text>
          <Text style={styles.emptyText}>Build something on the Draw tab and tap Save.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.ink,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.muted,
  },
});
