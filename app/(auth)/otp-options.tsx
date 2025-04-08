import { useForm, Controller } from "react-hook-form";
import { View, Text, Alert, ScrollView } from "react-native";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import { IFormInputs } from "@/types/type";
import { SafeAreaView } from "react-native-safe-area-context";

const OTPOptions = () => {
  const { handleSubmit } = useForm<IFormInputs>();

  const onEmailPressed = (data: IFormInputs) => {
    console.log(data);
    router.replace("/(auth)/email-otp");
  };

  const onSMSPressed = (data: IFormInputs) => {
    console.log(data);
    router.replace("/(auth)/sms-otp");
  };

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center">
        <View className="self-center">
          <Text className="text-4xl font-JakartaSemiBold">
            Select OTP option
          </Text>
        </View>
        <View className="px-5 mt-5">
          <CustomButton
            title="Email"
            onPress={handleSubmit(onEmailPressed)}
            bgVariant="default"
            textVariant="default"
          />{" "}
          <CustomButton
            title="SMS"
            onPress={handleSubmit(onSMSPressed)}
            bgVariant="default"
            textVariant="default"
          />{" "}
          {/* Signup Link */}{" "}
          <View className="mt-8 flex-row justify-center items-">
            <Link href="/sign-in" className="text-black font-bold">
              Back to Sign in{" "}
            </Link>{" "}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPOptions;
