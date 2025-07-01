import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { useCardDimensions } from "@/hooks/useCardDimensions";

const LoadingSkeleton = () => {
  const { cardWidth, cardHeight, imageHeight } = useCardDimensions();

  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [fadeAnim]);

  return (
    <View
      className="bg-gray-200 flex-none rounded-2xl shadow-md shadow-gray-100 overflow-hidden mr-3"
      style={{ width: cardWidth, height: cardHeight }}
    >
      <Animated.View
        className="bg-gray-300"
        style={{
          width: cardWidth,
          height: imageHeight,
          opacity: fadeAnim,
        }}
      />

      <View className="px-4 py-4">
        <Animated.View
          style={{
            width: cardWidth,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#CBD5E1",
            opacity: fadeAnim,
          }}
        />
        <Animated.View
          style={{
            width: cardWidth * 0.8,
            height: 8,
            borderRadius: 4,
            marginTop: 8,
            backgroundColor: "#CBD5E1",
            opacity: fadeAnim,
          }}
        />
      </View>
    </View>
  );
};

export default LoadingSkeleton;
