import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type SlidingModalProps = {
  children?: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  snapToPoints?: number[]; // Array of snap points as percentages of the screen height
  minHeight?: number; // Minimum height as a percentage of the screen height
  maxHeight?: number; // Maximum height as a percentage of the screen height
};

const SlidingModal: React.FC<SlidingModalProps> = ({
  children,
  isVisible,
  onClose,
  snapToPoints = [50, 30, 80], // Default snap points
  minHeight = 0, // Default min height: 50% of screen height
  maxHeight = 100, // Default max height: 100% of screen height
}) => {
  const backgroundColor = useThemeColor({}, "background");
  const translateY = useSharedValue(0);
  const minTranslateY = -SCREEN_HEIGHT * (maxHeight / 100);
  const maxTranslateY = -SCREEN_HEIGHT * (minHeight / 100);

  useEffect(() => {
    if (isVisible) {
      // Snap to the first point when the modal is shown
      translateY.value = withSpring(-SCREEN_HEIGHT * (snapToPoints[0] / 100), {
        damping: 50,
      });
    }
  }, [isVisible]);

  const handleClose = () => {
    // Close the modal
    translateY.value = withTiming(0, { duration: 100 }, () => {
      runOnJS(onClose)();
    });
  };

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(
        translateY.value,
        minTranslateY
      ); /* Clamp to min height */
      translateY.value = Math.min(
        translateY.value,
        maxTranslateY
      ); /* Clamp to max height */
    })
    .onEnd(() => {
      // Snap to the nearest point
      const snapToTranslateY = snapToPoints
        .map((point) => -SCREEN_HEIGHT * (point / 100)) // Convert percentage points to translateY values
        .concat(0) // Add 0 for closing
        .reduce((prev, curr) =>
          Math.abs(curr - translateY.value) < Math.abs(prev - translateY.value)
            ? curr
            : prev
        );

      if (snapToTranslateY === 0) {
        runOnJS(handleClose)(); // Close modal if snapping to 0
      } else {
        translateY.value = withSpring(snapToTranslateY, { damping: 50 });
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [maxTranslateY, minTranslateY],
      [25, 5],
      "clamp"
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={handleClose}
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            rBottomSheetStyle,
            { backgroundColor },
          ]}
        >
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetContainer: {
    position: "absolute",
    top: SCREEN_HEIGHT,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    //backgroundColor: "white",
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "gray",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default SlidingModal;
