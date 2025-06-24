// components/MapPreview.tsx
import React from "react";
import { View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

interface MapPreviewProps {
  latitude: number;
  longitude: number;
  zoomDelta?: number; // optional prop if you want to adjust
}

const MapPreview: React.FC<MapPreviewProps> = ({
  latitude,
  longitude,
  zoomDelta = 0.01,
}) => {
  const region: Region = {
    latitude,
    longitude,
    latitudeDelta: zoomDelta,
    longitudeDelta: zoomDelta,
  };

  return (
    <View className="h-40 w-full rounded-2xl overflow-hidden mb-6 bg-gray-200">
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        region={region}
        showsUserLocation={false}
        showsMyLocationButton={false}
        scrollEnabled={true}
        zoomEnabled={true}
        mapType="standard"
        loadingEnabled={true}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

export default MapPreview;
