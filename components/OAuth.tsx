import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
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

//  <View className="flex-row justify-around items-center">
//    {" "}
//    <View className="w-[35%] h-[2px] mx-1 bg-[#E2E8F0] rounded-full" />
//    <Text className="mx-5">Or</Text>{" "}
//    <View className="w-[35%] h-[2px] mx-1 bg-[#E2E8F0] rounded-full" />{" "}
//  </View>;
