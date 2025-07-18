import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "authToken";

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log("✅ Token stored successfully");
  } catch (error) {
    console.log("❌ Store Token Error:", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    console.log("📦 Retrieved token:", token);
    return token;
  } catch (error) {
    console.log("❌ Get Token Error:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log("🗑️ Token removed successfully");
  } catch (error) {
    console.log("❌ Remove Token Error:", error);
  }
};
