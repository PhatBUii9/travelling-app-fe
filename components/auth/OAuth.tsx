import { View, Text, Image } from "react-native";
import CustomButton from "../common/CustomButton";
import { icons } from "@/constant";

const OAuth = () => {
  const handleGoogleSignIn = async () => {};

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        bgVariant="outline"
        textVariant="primary"
        title="Log In with Google"
        onPress={handleGoogleSignIn}
        className="mt-5 shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
      />
    </View>
  );
};
export default OAuth;
