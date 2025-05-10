import { useForm, Controller } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { IFormInputs } from "@/types/type";
import { SafeAreaView } from "react-native-safe-area-context";

const EmailOTP = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const {
    userName,
    email,
    phoneNumber,
    otpVerificationMethod,
    otp,
    smsEnum,
    emailEnum,
  } = useLocalSearchParams();

  const onConfirmPressed = async (data: IFormInputs) => {
    console.log(data);
    router.replace("/(auth)/sign-in");
  };

  const onResendPressed = () => {
    console.warn("Resend pressed");
  };

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 bg-white-200"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center mt-[15%]">
          <Text className="text-4xl font-JakartaSemiBold">
            Confirmation Code
          </Text>
        </View>
        {/* Confirmation code */}
        <View className="px-5 mt-5">
          <InputField
            name="confirmationCode"
            control={control}
            placeholder="Enter your confirmation code"
            rules={{ required: "Confirmation code is required" }}
            label=""
          />
          {/* Confirm button */}
          <CustomButton
            title="Confirm"
            onPress={handleSubmit(onConfirmPressed)}
            bgVariant="default"
            textVariant="default"
          />{" "}
          {/* Resend button */}
          <CustomButton
            title="Resend Code"
            onPress={handleSubmit(onResendPressed)}
            bgVariant="default"
            textVariant="default"
          />{" "}
        </View>
        {/* Signup link */}{" "}
        <View className="mt-8 flex-row justify-center items-">
          <Link href="/sign-in" className="text-black font-bold">
            Back to Sign in{" "}
          </Link>{" "}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailOTP;
