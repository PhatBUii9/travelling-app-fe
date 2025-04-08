import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import validationRules from "@/utils/validationRules";
import { IFormInputs } from "@/types/type";

const SignUp = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputs>();

  const pwd = watch("password");
  const eml = watch("email");
  const phn = watch("phoneNumber");

  const onRegisterPressed = (data: IFormInputs) => {
    if (!eml && !phn) {
      Alert.alert("Alert", "Email or phone number is required!");
    } else {
      console.log(data);
      router.replace("/(auth)/otp-options");
    }
  };

  const onTermsOfUsePressed = () => {
    console.warn("Terms of Use pressed");
  };

  const onPrivacyPolicyPressed = () => {
    console.warn("Privacy Policy pressed");
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
          {/* OTP Link */}
          <View className="flex-row justify-center items-center mt-5">
            <Link href="/otp-options" className="text-black font-bold">
              Press this text to go to next screen
            </Link>
          </View>
          <View className="flex-1 items-center justify-center mt-[10%]">
            <Text className="text-4xl font-JakartaSemiBold">Register</Text>
          </View>
          <View className="flex-1 px-5 mt-5">
            {/* Username */}
            <InputField
              name="username"
              control={control}
              placeholder="Username"
              rules={validationRules.registerUsername}
              label="Username"
            />
            {/* Email */}
            <InputField
              name="email"
              control={control}
              placeholder="Email"
              rules={validationRules.email}
              label="Email"
            />
            {/* Phone Number */}
            <InputField
              name="phoneNumber"
              control={control}
              placeholder="Phone Number"
              rules={validationRules.phoneNumber}
              label="Phone Number"
            />
            {/* Date of Birth */}
            <InputField
              name="dob"
              control={control}
              placeholder="Date of Birth"
              rules={validationRules.dob}
              label="Date of Birth"
            />
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
            {/* Register Button */}
            <CustomButton
              title="Register"
              onPress={handleSubmit(onRegisterPressed)}
              className="mt-6"
              bgVariant="default"
              textVariant="default"
            />
            {/* Terms and Privacy Policy */}
            <Text className="mt-3 text-gray-500">
              By registering, you confirm that you accept our{" "}
              <Text className="text-[#FDB075]" onPress={onTermsOfUsePressed}>
                Term of Use
              </Text>{" "}
              and{" "}
              <Text className="text-[#FDB075]" onPress={onPrivacyPolicyPressed}>
                Privacy Policy
              </Text>
            </Text>
            {/* Signin Link */}
            <View className="flex-row justify-center items-center mt-5">
              <Text className="mr-2">Have an account?</Text>{" "}
              <Link href="/sign-in" className="text-black font-bold">
                Sign in
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
