import { useForm } from "react-hook-form";
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
import {
  checkUserDetail,
  checkUsernameExists,
} from "@/services/api/authService";

const SignUp = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IFormInputs>();

  const pwd = watch("password");
  const email = watch("email");
  const phone = watch("phoneNumber");

  const onRegisterPressed = async (data: IFormInputs) => {
    // if (!data.email && !data.phoneNumber) {
    //   Alert.alert("Validation Error", "Email or phone number is required.");
    //   return;
    // }

    try {
      console.log(data);
      const checkDetail = await checkUserDetail(data);
      console.log("fetching checkUserDetail...");
      if (!checkDetail) {
        Alert.alert("Register Error", "Registration Failed.");
        return;
      }

      Alert.alert("✅ User Detail Valid", "Proceeding to next step...");

      // TODO: Submit register request when backend is ready
      router.push({
        pathname: "/(auth)/otp-options",
        params: {
          userName: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
          dob: data.dob,
          password: data.password,
        },
      });
    } catch (error: any) {
      console.log("❌ User Deatil Check Error:", error);
      Alert.alert("Error", error?.message || "Something went wrong.");
    }
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

          {/* Title */}
          <View className="flex-1 items-center justify-center mt-[10%]">
            <Text className="text-4xl font-JakartaSemiBold">Register</Text>
          </View>

          {/* Input Fields */}
          <View className="flex-1 px-5 mt-5">
            <InputField
              name="username"
              control={control}
              placeholder="Username"
              rules={validationRules.registerUsername}
              label="Username"
            />
            <InputField
              name="email"
              control={control}
              placeholder="Email"
              rules={validationRules.email}
              label="Email"
            />
            <InputField
              name="phoneNumber"
              control={control}
              placeholder="Phone Number"
              rules={validationRules.phoneNumber}
              label="Phone Number"
            />
            <InputField
              name="dob"
              control={control}
              placeholder="Date of Birth"
              rules={validationRules.dob}
              label="Date of Birth"
            />
            <InputField
              name="password"
              control={control}
              placeholder="Password"
              rules={validationRules.password}
              secureTextEntry
              label="Password"
            />
            <InputField
              name="confirmPassword"
              control={control}
              placeholder="Confirm Password"
              secureTextEntry
              rules={{
                required: "Confirm Password is required",
                validate: (value: string) =>
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

            {/* Terms and Privacy */}
            <Text className="mt-3 text-gray-500">
              By registering, you confirm that you accept our{" "}
              <Text className="text-[#FDB075]">Terms of Use</Text> and{" "}
              <Text className="text-[#FDB075]">Privacy Policy</Text>
            </Text>

            {/* Sign-in Link */}
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
