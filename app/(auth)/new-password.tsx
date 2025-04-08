import { useForm, Controller } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Link, useRouter } from "expo-router";
import { IFormInputs } from "@/types/type";
import { SafeAreaView } from "react-native-safe-area-context";
import validationRules from "@/utils/validationRules";

const NewPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputs>();

  const pwd = watch("password");

  const onSubmitPressed = (data: IFormInputs) => {
    console.log(data);
    router.replace("/(auth)/sign-in");
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
          {/* Password */}
          <InputField
            name="password"
            control={control}
            placeholder="Password"
            rules={validationRules.password}
            secureTextEntry={true}
            label="Password"
          />
          {/* Confirm Password */}
          <InputField
            name="confirmPassword"
            control={control}
            placeholder="Confirm Password"
            secureTextEntry={true}
            rules={{
              required: "Confirm Password is required",
              validate: (value: string | undefined) =>
                value === pwd || "Passwords do not match",
            }}
            label="Confirm Password"
          />
          <CustomButton
            title="Send"
            onPress={handleSubmit(onSubmitPressed)}
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

export default NewPassword;
