import { View, Text, Alert } from "react-native";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendEmailOTP } from "@/services/api/authService";
import { EmailOTPRequest } from "@/types/type";

const OTPOptions = () => {
  const router = useRouter();

  const { userName, email, phoneNumber, dob, password } = useLocalSearchParams<{
    userName: string;
    email?: string;
    phoneNumber?: string;
    dob?: string;
    password?: string;
  }>();

  const onEmailPressed = async () => {
    try {
      if (!email) {
        Alert.alert("Validation Error", "Email is required to send OTP");
        return;
      }

      console.log("📨 Sending OTP via email...");

      const payload: EmailOTPRequest = {
        userName: userName,
        otpVerificationMethod: "EMAIL_OTP",
        emailEnum: "EMAIL_OTP_REGISTER",
        email,
      };

      const isSendingOTP = await sendEmailOTP(payload);

      if (!isSendingOTP) {
        Alert.alert("Sending OTP Error", "Sending OTP Failed.");
        return;
      }

      Alert.alert("✅ OTP Sent", "Proceeding to next step...");

      router.push({
        pathname: "/(auth)/email-otp",
        params: {
          otpVerificationMethod: "EMAIL_OTP",
          userName,
          email,
          phoneNumber,
          dob,
          password,
          emailEnum: "EMAIL_OTP_REGISTER",
        },
      });
    } catch (error: any) {
      console.log("❌ Sending OTP Error:", error);
      Alert.alert("Error", error?.message || "Something went wrong.");
    }
  };

  const onSMSPressed = () => {
    if (!phoneNumber) {
      Alert.alert("Validation Error", "Phone number is required to send OTP");
      return;
    }

    router.push({
      pathname: "/(auth)/sms-otp",
      params: {
        otpVerificationMethod: "SMS_OTP",
        userName,
        email,
        phoneNumber,
        dob,
        password,
        smsEnum: "SMS_OTP_REGISTER",
      },
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center">
        <View className="self-center">
          <Text className="text-4xl font-JakartaSemiBold">
            Select OTP option
          </Text>
        </View>

        <View className="px-5 mt-5">
          {email ? (
            <CustomButton
              title="Email"
              onPress={onEmailPressed}
              bgVariant="default"
              textVariant="default"
              disabled={!email}
            />
          ) : null}

          {phoneNumber ? (
            <CustomButton
              title="SMS"
              onPress={onSMSPressed}
              bgVariant="default"
              textVariant="default"
              disabled={!phoneNumber}
            />
          ) : null}

          <View className="mt-8 flex-row justify-center items-center">
            <Link href="/sign-in" className="text-black font-bold">
              Back to Sign in
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPOptions;
