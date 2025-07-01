import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

const IMAGE_SIZE = 64; // matches your <Image className="h-16 w-16" />
const ICON_SIZE = 24; // matches your checkbox icon size

const PlaceLoadingSkeleton = () => {
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
    <View className="w-full flex-row items-start rounded-2xl p-4 bg-white border border-gray-200 shadow-sm mb-4 overflow-hidden">
      {/* Image placeholder */}
      <Animated.View
        style={{
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          borderRadius: 8,
          backgroundColor: "#E5E7EB", // gray-200
          opacity: fadeAnim,
        }}
      />

      {/* Text lines placeholder */}
      <View className="flex-1 ml-4 justify-center">
        <Animated.View
          style={{
            width: "60%",
            height: 20,
            borderRadius: 4,
            backgroundColor: "#CBD5E1", // gray-300
            opacity: fadeAnim,
          }}
        />
        <Animated.View
          style={{
            width: "40%",
            height: 16,
            borderRadius: 4,
            backgroundColor: "#CBD5E1",
            opacity: fadeAnim,
            marginTop: 8,
          }}
        />
      </View>

      {/* Checkbox placeholder */}
      <Animated.View
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          borderRadius: ICON_SIZE / 2,
          backgroundColor: "#E5E7EB",
          opacity: fadeAnim,
          marginLeft: 8,
          alignSelf: "center",
        }}
      />
    </View>
  );
};

export default PlaceLoadingSkeleton;
