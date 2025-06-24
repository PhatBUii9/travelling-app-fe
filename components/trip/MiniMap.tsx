import React from "react";
import { View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

interface MiniMapProps {
  region: Region;
}

const MiniMap: React.FC<MiniMapProps> = ({ region }) => (
  <View
    className="rounded-2xl overflow-hidden mb-6"
    style={{ height: "100%", width: "100%" }}
  >
    <MapView style={{ flex: 1 }} region={region} loadingEnabled>
      <Marker
        coordinate={{ latitude: region.latitude, longitude: region.longitude }}
      />
    </MapView>
  </View>
);

export default MiniMap;
