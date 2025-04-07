import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constant";
import { Link, useRouter } from "expo-router";

interface IFormInputs {
  username: string;
}

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const submit = (data: IFormInputs) => {
    console.log(data);
    Alert.alert(JSON.stringify(data));
  };

  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center ">
      <Text className="text-3xl mb-5">Sign Up Screen</Text>
      <View className="mt-8 flex-row justify-center items-">
        <Text className="text-gerenal-100 mr-2">Back to sign in</Text>{" "}
        <Link href="/sign-in" className="text-black font-bold">
          Sign up{" "}
        </Link>
        //{" "}
      </View>
    </View>
  );
};

export default SignUp;
