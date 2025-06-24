import { View, Text, Alert } from "react-native";
import CustomButton from "@/components/common/CustomButton";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendEmailOTP } from "@/services/api/authService";
import { EmailOTPRequest, PhoneOTPRequest } from "@/types/type";
import { useLoading } from "@/contexts/LoadingContext";
import { hide } from "expo-splash-screen";
import { ROUTES } from "@/constant/routes";
import { useRegistration } from "@/contexts/RegistrationContext";
import { useEffect } from "react";

const OTPOptions = () => {
  const router = useRouter();

  const { showLoading, hideLoading } = useLoading();

  const { data, setData } = useRegistration();

  const onEmailPressed = async () => {
    try {
      if (!data || !data.username) {
        Alert.alert("Error", "Registration data missing—please sign up again.");
        return;
      }
      if (!data.email) {
        Alert.alert("Validation Error", "Email is required to send OTP");
        return;
      }

      console.log("📨 Sending OTP via email...");
      showLoading();

      const payload: EmailOTPRequest = {
        username: data?.username,
        otpVerificationMethod: "EMAIL_OTP",
        emailEnum: "EMAIL_OTP_REGISTER",
        email: data.email,
      };

      console.log(payload);

      const isSendingOTP = await sendEmailOTP(payload);

      if (!isSendingOTP) {
        Alert.alert("Sending OTP Error", "Sending OTP Failed.");
        return;
      }

      Alert.alert("✅ OTP Sent", "Proceeding to next step...");

      setData({
        ...data,
        otpVerificationMethod: "EMAIL_OTP",
        emailEnum: "EMAIL_OTP_REGISTER",
      });
      router.push(ROUTES.AUTH.EMAIL_OTP);
    } catch (error: any) {
      console.log("❌ Sending OTP Error:", error);
      Alert.alert("Error", error?.message || "Something went wrong.");
    } finally {
      hideLoading();
    }
  };

  const onSMSPressed = async () => {
    if (!data || !data.username) {
      Alert.alert("Error", "Registration data missing—please sign up again.");
      return;
    }
    if (!data.phoneNumber) {
      Alert.alert("Validation Error", "Email is required to send OTP");
      return;
    }

    console.log("📨 Sending OTP via email...");
    showLoading();

    const payload: PhoneOTPRequest = {
      username: data.username,
      otpVerificationMethod: "PHONE_OTP",
      phoneEnum: "PHONE_OTP_REGISTER",
      phoneNumber: data.phoneNumber,
    };

    // const isSendingOTP = await sendEmailOTP(payload);

    // if (!isSendingOTP) {
    //   Alert.alert("Sending OTP Error", "Sending OTP Failed.");
    //   return;
    // }

    // Alert.alert("✅ OTP Sent", "Proceeding to next step...");

    setData({
      ...data,
      otpVerificationMethod: "EMAIL_OTP",
      emailEnum: "EMAIL_OTP_REGISTER",
    });
    router.push(ROUTES.AUTH.EMAIL_OTP);
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
          {data?.email ? (
            <CustomButton
              title="Email"
              onPress={onEmailPressed}
              bgVariant="default"
              textVariant="default"
              disabled={!data?.email}
            />
          ) : null}

          {data?.phoneNumber ? (
            <CustomButton
              title="SMS"
              onPress={onSMSPressed}
              bgVariant="default"
              textVariant="default"
              disabled={!data?.phoneNumber}
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
