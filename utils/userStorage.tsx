import { User } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "authUser";

export const storeUser = async (user?: User) => {
  try {
    const jsonUser = JSON.stringify(user);
    await AsyncStorage.setItem(USER_KEY, jsonUser);
    console.log("✅ User stored successfully");
  } catch (error) {
    console.log("❌ Store User Error:", error);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const jsonUser = await AsyncStorage.getItem(USER_KEY);
    if (jsonUser) {
      const parsed = JSON.parse(jsonUser) as User;
      console.log("📦 Retrieved user:", parsed);
      return parsed;
    }
    return null;
  } catch (error) {
    console.log("❌ Get User Error:", error);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    console.log("🗑️ User removed from storage");
  } catch (error) {
    console.log("❌ Remove User Error:", error);
  }
};
