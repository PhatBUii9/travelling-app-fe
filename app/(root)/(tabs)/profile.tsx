import CustomButton from "@/components/common/CustomButton";
import { ROUTES } from "@/constant/routes";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

const Home = () => {
  const router = useRouter();
  const auth = useAuth();
  const onRegisterPressed = async () => {
    await auth.logout();
    router.push(ROUTES.AUTH.SIGN_IN);
  };

  return (
    <View className="flex-1 ">
      <View className="flex-1 px-5 mt-5">
        <View className="justify-center items-center">
          <Text>This is Profile screen</Text>
        </View>
        <CustomButton
          title="Sign Out"
          onPress={() => onRegisterPressed()}
          className="mt-6"
          bgVariant="default"
          textVariant="default"
        />
      </View>
    </View>
  );
};

export default Home;
