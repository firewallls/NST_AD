import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import DesignPreview from "../components/DesignPreview";
import { formatDate } from "../components/DesignCard";
import { COLORS, SHAPES, SHAPE_TYPES } from "../constants/theme";
import { deleteDesign, getDesignById } from "../storage/designStorage";

// Shows one saved design. This is the second screen of the "Saved" tab's stack.
export default function DesignDetailScreen({ route, navigation }) {
  const [design, setDesign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  const designId = route.params?.designId;

  useEffect(() => {
    let isActive = true;

    const loadDesign = async () => {
      if (!designId) {
        setDesign(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const loadedDesign = await getDesignById(designId);
      if (isActive) {
        setDesign(loadedDesign);
        setIsLoading(false);
      }
    };

    loadDesign();
    return () => {
      isActive = false;
    };
  }, [designId]);

  const handleDelete = async () => {
    await deleteDesign(designId);
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={styles.muted}>Loading design…</Text>
      </View>
    );
  }

  if (!design) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={styles.muted}>Design not found.</Text>
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
            <View
              style={[styles.dot, { backgroundColor: SHAPES[type].color }]}
            />
            <Text style={styles.statText}>
              {design?.shapes?.filter((s) => s.type === type).length || 0}{" "}
              {SHAPES[type].label}
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
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 16,
    gap: 16,
    alignItems: "center",
  },
  title: {
    alignSelf: "stretch",
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.ink,
  },
  muted: {
    color: COLORS.muted,
  },
  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
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
    alignSelf: "stretch",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  deleteText: {
    color: COLORS.danger,
    fontWeight: "600",
  },
});
