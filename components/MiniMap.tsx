// components/MiniMap.tsx
import React from "react";
import { View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

interface MiniMapProps {
  /** The map’s region (latitude/longitude + deltas). */
  region: Region;

  markerCoordinate?: {
    latitude: number;
    longitude: number;
  };

  containerHeight?: number;
}

const MiniMap: React.FC<MiniMapProps> = ({
  region,
  markerCoordinate,
  containerHeight = 160, // 40 × 4px (Tailwind h-40 is 160px)
}) => {
  return (
    <View
      style={{ height: containerHeight, width: "100%" }}
      className="rounded-2xl overflow-hidden mb-6"
    >
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        region={region}
        showsUserLocation={false}
        showsMyLocationButton={false}
        scrollEnabled
        zoomEnabled
        mapType="standard"
        loadingEnabled
      >
        <Marker
          coordinate={
            markerCoordinate ?? {
              latitude: region.latitude,
              longitude: region.longitude,
            }
          }
        />
      </MapView>
    </View>
  );
};

export default MiniMap;
