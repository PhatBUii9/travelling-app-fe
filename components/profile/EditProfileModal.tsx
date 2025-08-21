import React, { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { isEmail, isNonEmpty } from "@/utils/validators";

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditProfileModal: React.FC<Props> = ({ open, onClose }) => {
  const auth = useAuth();

  const [name, setName] = useState(auth.user?.username ?? "");
  const [email, setEmail] = useState(auth.user?.email ?? "");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    if (open) {
      setName(auth.user?.username ?? "");
      setEmail(auth.user?.email ?? "");
      setErrors({});
    }
  }, [open, auth.user?.username, auth.user?.email]);

  const validate = () => {
    const next: typeof errors = {};
    if (!isNonEmpty(name)) next.name = "Name is required";
    if (email && !isEmail(email)) next.email = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    const token = auth.token ?? "";
    const updatedUser = {
      ...(auth.user ?? { id: "me", username: "" }),
      username: name.trim(),
      email: email.trim() || undefined,
    };
    await auth.login(token, updatedUser);
    onClose();
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableWithoutFeedback>
          <View className="bg-white rounded-2xl p-4 w-full">
            <Text className="text-lg font-JakartaBold mb-3">Edit Profile</Text>

            <Text className="text-xs text-gray-600 mb-1">Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              autoFocus
              style={{
                borderWidth: 1,
                borderColor: errors.name ? "#DC2626" : "#e5e7eb",
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: Platform.OS === "ios" ? 10 : 8,
              }}
            />
            {!!errors.name && (
              <Text className="text-xs text-red-600 mt-1">{errors.name}</Text>
            )}

            <View className="mt-3">
              <Text className="text-xs text-gray-600 mb-1">
                Email (optional)
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  borderWidth: 1,
                  borderColor: errors.email ? "#DC2626" : "#e5e7eb",
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  paddingVertical: Platform.OS === "ios" ? 10 : 8,
                }}
              />
              {!!errors.email && (
                <Text className="text-xs text-red-600 mt-1">
                  {errors.email}
                </Text>
              )}
            </View>

            <View className="flex-row justify-end gap-4 mt-4">
              <TouchableOpacity onPress={onClose}>
                <Text className="text-gray-700 text-base">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={save}>
                <Text className="text-blue-600 text-base">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default EditProfileModal;
