import { useForm } from "react-hook-form";
import {
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Link, RelativePathString, useRouter } from "expo-router";
import { IFormInputs } from "@/types/type";
import validationRules from "@/utils/validationRules";
import { SafeAreaView } from "react-native-safe-area-context";
import SocialButtons from "@/components/SocialButtons";
import { withLoading } from "@/utils/withLoading";
import { useLoading } from "@/contexts/LoadingContext";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/constant/routes";

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const { showLoading, hideLoading } = useLoading();
  const auth = useAuth();
  const router = useRouter();

  const onSignInPress = async (data: IFormInputs) => {
    console.log("Login data:", data);

    await withLoading(
      async () => {
        const dummyToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.token.string";

        await auth.login(dummyToken);
        console.log();
        Alert.alert("Login Success", "Token saved in AsyncStorage.");
        router.push(ROUTES.ROOT.HOME);
      },
      showLoading,
      hideLoading
    );

    // await withLoading(
    //   async () => {
    //     const response = await fetch("dummyTokenAPI");
    //     const result = await response.json();
    //     const accessToken = String(result.token);

    //     await auth.login(accessToken);
    //     Alert.alert("Login Success", "Token saved in AsyncStorage.");

    //     router.push(ROUTES.ROOT.HOME);
    //   },
    //   showLoading,
    //   hideLoading
    // );
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 bg-white-200"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 items-center justify-center mt-[15%]">
            <Text className="text-4xl font-JakartaSemiBold">Welcome 👋</Text>
          </View>
          <View className="flex-1 px-5 mt-5">
            <InputField
              name="username"
              control={control}
              placeholder="Username/Email/Phone Number"
              rules={validationRules.username}
              label="Email"
            />
            <InputField
              name="password"
              control={control}
              placeholder="Password"
              secureTextEntry
              rules={validationRules.password}
              label="Password"
            />
            <View className="ml-2 mb-2 mt-2 flex-row justify-start">
              <Link href="/forget-password" className="text-gray-500 font-bold">
                Forget Password?
              </Link>
            </View>
            <CustomButton
              title="Sign In"
              onPress={handleSubmit(onSignInPress)}
              className="mt-6"
              bgVariant="default"
              textVariant="default"
            />
            <View>
              <View className="flex flex-row justify-center items-center gap-x-3">
                <View className="flex-1 h-[1px] bg-general-100" />
                <Text className="text-lg">Or</Text>
                <View className="flex-1 h-[1px] bg-general-100" />
              </View>
            </View>
            <SocialButtons />
          </View>
          <View className="mt-8 flex-row justify-center">
            <Text className="mr-2">Don’t have an account?</Text>
            <Link href="/sign-up" className="text-black font-bold">
              Sign up
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
