import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/common/CustomButton";
import { checkUsernameExists } from "@/services/api/authService";

const CheckUsername = () => {
  const [username, setUsername] = useState("");

  const handleCheck = async () => {
    try {
      console.log("🚀 Checking username:", username);

      if (!username.trim()) {
        Alert.alert("Validation", "Please enter a username to check.");
        return;
      }

      const exists = await checkUsernameExists(username);
      console.log("✅ Exists:", exists);

      if (exists) {
        Alert.alert(
          "Username Taken",
          "❌ This username is already registered.",
        );
      } else {
        Alert.alert("Username Available", "✅ You can use this username.");
      }
    } catch (e) {
      console.error("🔥 CRASH in handleCheck:", e);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-5 justify-center"
      >
        <View>
          <Text className="text-2xl font-bold text-center mb-6">
            🔍 Check Username
          </Text>

          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            className="border border-gray-300 rounded-md px-4 py-3 mb-4 text-base"
          />

          <CustomButton
            title="Check"
            onPress={handleCheck}
            disabled={!username.trim()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CheckUsername;
