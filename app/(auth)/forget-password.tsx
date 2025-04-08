import { useForm, Controller } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Link, useRouter } from "expo-router";
import { IFormInputs } from "@/types/type";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSendPressed = (data: IFormInputs) => {
    console.log(data);
    router.replace("/(auth)/new-password");
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
            Reset Your Password
          </Text>
        </View>
        <View className="px-5 mt-5">
          <InputField
            name="email"
            control={control}
            placeholder="Enter your email address"
            rules={{ required: "Email address is required" }}
            label=""
          />
          <CustomButton
            title="Send"
            onPress={handleSubmit(onSendPressed)}
            bgVariant="default"
            textVariant="default"
          />{" "}
        </View>
        {/* Signup Link */}{" "}
        <View className="mt-8 flex-row justify-center items-">
          <Link href="/sign-in" className="text-black font-bold">
            Back to Sign in{" "}
          </Link>{" "}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;
