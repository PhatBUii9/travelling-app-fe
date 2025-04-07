import { useForm, Controller } from "react-hook-form";
import { View, Text, Alert, ScrollView } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Link, useRouter } from "expo-router";
import { IFormInputs } from "@/types/type";
import validationRules from "@/utils/validationRules";
import { SafeAreaView } from "react-native-safe-area-context";
import SocialButtons from "@/components/SocialButtons";

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSignInPress = (data: IFormInputs) => {
    console.log(data);
    Alert.alert(JSON.stringify(data));
  };

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-white-200">
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
          <CustomButton
            title="Sign In"
            onPress={handleSubmit(onSignInPress)}
            className="mt-6"
            bgVariant="default"
            textVariant="default"
          />{" "}
          {/* -- Or -- */}
          <View>
            <View className="flex flex-row justify-center items-center gap-x-3">
              <View className="flex-1 h-[1px] bg-general-100" />
              <Text className="text-lg">Or</Text>
              <View className="flex-1 h-[1px] bg-general-100" />
            </View>
          </View>
          {/* Social Buttons */}
          <SocialButtons />
        </View>
        {/* Signup Link */}{" "}
        <View className="mt-8 flex-row justify-center items-">
          <Text className="text-gerenal-100 mr-2 ">Don’t have an account?</Text>{" "}
          <Link href="/sign-up" className="text-black font-bold">
            Sign up{" "}
          </Link>
          //{" "}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
