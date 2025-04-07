// import React from "react";
// import { View, Text, ImageBackground, ScrollView, Alert } from "react-native";
// import { useForm } from "react-hook-form";
// import { Link, useRouter } from "expo-router";
// import InputField from "@/components/InputField"; // your custom InputField component
// import CustomButton from "@/components/CustomButton"; // your custom button component
// import { images } from "@/constant"; // make sure images.signInBackground exists
// import { IFormInputs } from "@/types/type";
// import validationRules from "@/utils/validationRules";

// const LoginScreen: React.FC = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IFormInputs>();
//   const router = useRouter();

//   const onSignInPress = (data: IFormInputs) => {
//     console.log(data);
//     Alert.alert(JSON.stringify(data));
//   };

//   return (
//     <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
//       <ImageBackground
//         source={images.signInBackground}
//         resizeMode="cover"
//         className="flex-1"
//       >
//         {/* Overlay container */}
//         <View className="flex-1 items-center justify-center px-5">
//           <Text className="text-5xl text-white font-jakartaSemiBold mb-8">
//             Welcome 👋
//           </Text>
//           {/* Input Fields */}
//           <InputField
//             name="username"
//             control={control}
//             placeholder="Username/Email/Phone Number"
//             rules={validationRules.username}
//             label="Email"
//           />
//           <InputField
//             name="password"
//             control={control}
//             placeholder="Password"
//             secureTextEntry
//             rules={validationRules.password}
//             label="Password"
//           />
//           {/* Login Button */}
//           <CustomButton
//             title="Log in"
//             className="bg-primary py-3 rounded-md mt-4"
//             //textClassName="text-white font-bold text-center"
//             onPress={handleSubmit(onSignInPress)}
//           />
//           {/* Signup Link */}
//           <View className="mt-8 flex-row justify-center">
//             <Text className="text-red-200 mr-2">Don’t have an account?</Text>
//             <Link href="/sign-up" className="text-primary font-bold">
//               Sign up
//             </Link>
//           </View>
//         </View>
//       </ImageBackground>
//     </ScrollView>
//   );
// };

// export default LoginScreen;

import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constant";
import { Link, useRouter } from "expo-router";
import { IFormInputs } from "@/types/type";
import validationRules from "@/utils/validationRules";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constant/theme";
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
