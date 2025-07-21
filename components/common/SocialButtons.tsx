import { View, Image, Platform } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constant";

const SocialButtons = () => {
  const handleGoogleSignIn = async () => {
    console.warn("google");
  };
  const handleFacebookSignIn = async () => {
    console.warn("facebook");
  };
  const handleAppleSignIn = async () => {
    console.warn("apple");
  };

  return (
    <View className="flex-1">
      {/* Google */}
      <CustomButton
        bgVariant="google"
        textVariant="primary"
        title="Log In with Google"
        onPress={handleGoogleSignIn}
        className="shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
      />
      {/* Facebook */}
      <CustomButton
        bgVariant="facebook"
        textVariant="facebook"
        title="Log In with Facebook"
        onPress={handleFacebookSignIn}
        className="shadow-none"
        IconLeft={() => (
          <Image
            source={icons.facebook}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
      />
      {/* Apple */}
      {Platform.OS === "ios" && (
        <CustomButton
          bgVariant="apple"
          textVariant="apple"
          title="Log In with Apple"
          onPress={handleAppleSignIn}
          className="shadow-none"
          IconLeft={() => (
            <Image
              source={icons.google}
              resizeMode="contain"
              className="w-5 h-5 mx-2"
            />
          )}
        />
      )}
    </View>
  );
};
export default SocialButtons;
