import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from "react-native";

type CarouselProps = {
  items: React.ReactNode[]; // List of components to display in the carousel
  containerStyle?: StyleProp<ViewStyle>; // Adjustable styles for the main container
  indicatorStyle?: StyleProp<ViewStyle>;
};

const Carousel: React.FC<CarouselProps> = ({
  items,
  containerStyle,
  indicatorStyle,
}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View style={[styles.scrollContainer, containerStyle]}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {items.map((item, index) => (
          <View
            style={[styles.itemContainer, { width: windowWidth }]}
            key={index}
          >
            {item}
          </View>
        ))}
      </ScrollView>
      <View style={[styles.indicatorContainer, indicatorStyle]}>
        {items.length > 1 &&
          items.map((_, index) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={index}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 10,
  },
});

export default Carousel;
