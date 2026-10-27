// TODO (Task 3): Save designs on the device with AsyncStorage.
//
// 1. Install it:  npx expo install @react-native-async-storage/async-storage
// 2. Import it:   import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 3. Store ALL designs as one JSON array under a single key, e.g. '@shape-studio/designs'.
//    AsyncStorage only stores strings, so use JSON.stringify / JSON.parse.
//
// A design looks like:
// { id, createdAt, canvas: { width, height }, shapes: [{ id, type, x, y }] }

const STORAGE_KEY = '@shape-studio/designs';

// Return every saved design (newest first), or [] if nothing is saved yet.
export async function getDesigns() {
  try {
    const designsJson = await AsyncStorage.getItem(STORAGE_KEY);
    if (designsJson) {
      return JSON.parse(designsJson);
    }
  } catch (error) {
    console.error('Error loading designs:', error);
  }
  return [];
}

// Add one design to the saved list.
export async function saveDesign(design) {
  try {
    const designs = await getDesigns();
    designs.push(design);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
  } catch (error) {
    console.error('Error saving design:', error);
  }
}

// Return the design with this id, or null if it does not exist.
export async function getDesignById(id) {
  try {
    const designs = await getDesigns();
    return designs.find((design) => design.id === id) || null;
  } catch (error) {
    console.error('Error loading design:', error);
  }
  return null;
}

// Remove the design with this id.
export async function deleteDesign(id) {
  try {
    const designs = await getDesigns();
    const newDesigns = designs.filter((design) => design.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDesigns));
  } catch (error) {
    console.error('Error deleting design:', error);
  }
}
