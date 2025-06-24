import { useForm } from "react-hook-form";
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomButton from "@/components/common/CustomButton";
import InputField from "@/components/common/InputField";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import validationRules from "@/utils/validationRules";
import { IFormInputs } from "@/types/type";
import {
  checkUserDetail,
  checkUsernameExists,
} from "@/services/api/authService";
import { useLoading } from "@/contexts/LoadingContext";
import { withLoading } from "@/utils/withLoading";
import { useRegistration } from "@/contexts/RegistrationContext";
import { ROUTES } from "@/constant/routes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUp = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<IFormInputs>();

  const pwd = watch("password");
  const { showLoading, hideLoading } = useLoading();
  const { data, setData } = useRegistration();

  const onRegisterPressed = async (form: IFormInputs) => {
    // Require either email or phone
    if (!form.email && !form.phoneNumber) {
      setError("email", {
        type: "manual",
        message: "Email or phone number is required",
      });
      setError("phoneNumber", {
        type: "manual",
        message: "Email or phone number is required",
      });
      return;
    }

    await withLoading(
      async () => {
        console.log("fetching checkUserDetail...");
        console.log(form);
        const name = form.username;

        const payload = {
          username: name?.trim(),
          email: form.email,
          password: form.password,
          phoneNumber: form.phoneNumber,
          dob: form.dob,
        };

        const checkDetail = await checkUserDetail(payload);

        switch (checkDetail.code) {
          case "E000":
            console.log("Users details pass the verification");
            break;
          case "E002":
            setError("username", {
              type: "manual",
              message: "Username has already been taken",
            });
            return;
          case "E013":
            setError("username", {
              type: "manual",
              message: "Username format invalid",
            });
            return;
          case "E010":
            setError("email", {
              type: "manual",
              message: "Email format invalid",
            });
            return;
          case "E003":
            setError("email", {
              type: "manual",
              message: "Email has already been taken",
            });
            return;
          case "E004":
            setError("password", {
              type: "manual",
              message:
                "Password must be 8-20 characters long, include at least one lowercase letter, one uppercase letter, one digit, one special character, and must not contain whitespace, <, >, /, or \\ characters.",
            });
            return;
          case "E011":
            setError("password", {
              type: "manual",
              message:
                "Phone number must start with 0, 84, or +84, followed by 3, 5, 7, 8, or 9, and contain 7 to 8 digits",
            });
            return;
          default:
            Alert.alert(
              "Register Error",
              checkDetail.message || "Unexpected error"
            );
            return;
        }

        Alert.alert("✅ User Detail Valid", "Proceeding to next step...");

        setData({
          username: form.username,
          email: form.email,
          phoneNumber: form.phoneNumber,
          dob: form.dob,
          password: form.password,
        });
        router.push(ROUTES.AUTH.OTP_OPTIONS);
      },
      showLoading,
      hideLoading
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAwareScrollView
        className="bg-white-200"
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={Platform.OS === "ios" ? 0 : 20}
        keyboardShouldPersistTaps="handled"
      >
        {/* OTP Link */}
        <View className="flex-row justify-center items-center mt-5">
          <Link href="/otp-options" className="text-black font-bold">
            Press this text to go to next screen
          </Link>
        </View>

        {/* Title */}
        <View className="items-center justify-center mt-10">
          <Text className="text-4xl font-JakartaSemiBold">Register</Text>
        </View>

        {/* Input Fields */}
        <View className=" px-5 mt-5">
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
          <View className="flex-row justify-center items-center mt-auto py-4">
            <Text className="mr-2">Have an account?</Text>{" "}
            <Link href="/sign-in" className="text-black font-bold">
              Sign in
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
