import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HeaderLeft = () => {
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ paddingHorizontal: 5 }}
    >
      <Icon name="chevron-left" size={24} color="#000" />
    </TouchableOpacity>
  );
};

export default HeaderLeft;
