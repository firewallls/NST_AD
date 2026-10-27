import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import DesignPreview from '../components/DesignPreview';
import { formatDate } from '../components/DesignCard';
import { COLORS, SHAPES, SHAPE_TYPES } from '../constants/theme';

// Shows one saved design. This is the second screen of the "Saved" tab's stack.
export default function DesignDetailScreen({ route, navigation }) {
  const [design, setDesign] = useState(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    // TODO (Task 2): Read the design id from route.params.
    let designId = route.params.route;

    // TODO (Task 3): Load that design with getDesignById(id) and store it with setDesign.
  }, []);

  const handleDelete = async () => {
    // TODO (Task 3): Delete the design with deleteDesign(id).
    // TODO (Task 2): Then go back to the Saved list.
    navigation.goBack();
  };

  if (!design) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={styles.muted}>Loading design…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{formatDate(design.createdAt)}</Text>

      <DesignPreview design={design} width={Math.min(width - 32, 480)} />

      <View style={styles.stats}>
        {SHAPE_TYPES.map((type) => (
          <View key={type} style={styles.stat}>
            <View style={[styles.dot, { backgroundColor: SHAPES[type].color }]} />
            <Text style={styles.statText}>
              {design.shapes.filter((s) => s.type === type).length} {SHAPES[type].label}
            </Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.delete} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete design</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    gap: 16,
    alignItems: 'center',
  },
  title: {
    alignSelf: 'stretch',
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.ink,
  },
  muted: {
    color: COLORS.muted,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statText: {
    fontSize: 14,
    color: COLORS.ink,
  },
  delete: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  deleteText: {
    color: COLORS.danger,
    fontWeight: '600',
  },
});
