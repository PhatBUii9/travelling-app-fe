// components/profile/ChangePasswordModal.tsx
import React, { useMemo, useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { changePassword } from "@/services/api/authService";
import {
  isNonEmpty,
  passwordStrength,
  passwordsMatch,
  StrengthLabel,
} from "@/utils/validators";

type Props = {
  open: boolean;
  onClose: () => void;
  token?: string | null;
};

const StrengthPill = ({ level }: { level: StrengthLabel }) => {
  const color =
    level === "Weak" ? "#DC2626" : level === "Medium" ? "#F59E0B" : "#22C55E";
  return (
    <View
      className="self-start mt-1 px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `${color}22` }}
    >
      <Text style={{ color }} className="text-[11px] font-JakartaBold">
        {level} password
      </Text>
    </View>
  );
};

const ChangePasswordModal: React.FC<Props> = ({ open, onClose, token }) => {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{
    current?: string;
    next?: string;
    confirm?: string;
  }>({});
  const [showCur, setShowCur] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const strength = useMemo(() => passwordStrength(next), [next]);

  const reset = () => {
    setCurrent("");
    setNext("");
    setConfirm("");
    setErrors({});
    setShowCur(false);
    setShowNext(false);
    setShowConf(false);
    setSubmitting(false);
  };

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!isNonEmpty(current)) nextErrors.current = "Enter current password";
    if (!isNonEmpty(next)) nextErrors.next = "Enter new password";
    if (!passwordsMatch(next, confirm))
      nextErrors.confirm = "Passwords do not match";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    const res = await changePassword({
      token,
      currentPassword: current,
      newPassword: next,
    });
    setSubmitting(false);

    if (!res.ok) {
      setErrors((prev) => ({
        ...prev,
        current: res.message || "Unable to change password",
      }));
      return;
    }

    Alert.alert("Password Updated", "Your password has been changed.", [
      { text: "OK", onPress: onClose },
    ]);
    reset();
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
        onPress={() => {
          if (!submitting) onClose();
        }}
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
            <Text className="text-lg font-JakartaBold mb-3">
              Change Password
            </Text>

            {/* Current */}
            <Text className="text-xs text-gray-600 mb-1">Current Password</Text>
            <View
              className="flex-row items-center rounded-xl px-3"
              style={{
                borderWidth: 1,
                borderColor: errors.current ? "#DC2626" : "#e5e7eb",
              }}
            >
              <TextInput
                value={current}
                onChangeText={setCurrent}
                placeholder="Current password"
                secureTextEntry={!showCur}
                style={{
                  flex: 1,
                  paddingVertical: Platform.OS === "ios" ? 10 : 8,
                }}
              />
              <TouchableOpacity
                onPress={() => setShowCur((v) => !v)}
                hitSlop={10}
              >
                <Icon
                  name={showCur ? "eye-off" : "eye"}
                  size={18}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            {!!errors.current && (
              <Text className="text-xs text-red-600 mt-1">
                {errors.current}
              </Text>
            )}

            {/* New */}
            <View className="mt-3">
              <Text className="text-xs text-gray-600 mb-1">New Password</Text>
              <View
                className="flex-row items-center rounded-xl px-3"
                style={{
                  borderWidth: 1,
                  borderColor: errors.next ? "#DC2626" : "#e5e7eb",
                }}
              >
                <TextInput
                  value={next}
                  onChangeText={setNext}
                  placeholder="New password"
                  secureTextEntry={!showNext}
                  style={{
                    flex: 1,
                    paddingVertical: Platform.OS === "ios" ? 10 : 8,
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowNext((v) => !v)}
                  hitSlop={10}
                >
                  <Icon
                    name={showNext ? "eye-off" : "eye"}
                    size={18}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
              {!!errors.next && (
                <Text className="text-xs text-red-600 mt-1">{errors.next}</Text>
              )}
              {isNonEmpty(next) && <StrengthPill level={strength.label} />}
            </View>

            {/* Confirm */}
            <View className="mt-3">
              <Text className="text-xs text-gray-600 mb-1">
                Confirm New Password
              </Text>
              <View
                className="flex-row items-center rounded-xl px-3"
                style={{
                  borderWidth: 1,
                  borderColor: errors.confirm ? "#DC2626" : "#e5e7eb",
                }}
              >
                <TextInput
                  value={confirm}
                  onChangeText={setConfirm}
                  placeholder="Re-enter new password"
                  secureTextEntry={!showConf}
                  style={{
                    flex: 1,
                    paddingVertical: Platform.OS === "ios" ? 10 : 8,
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowConf((v) => !v)}
                  hitSlop={10}
                >
                  <Icon
                    name={showConf ? "eye-off" : "eye"}
                    size={18}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
              {!!errors.confirm && (
                <Text className="text-xs text-red-600 mt-1">
                  {errors.confirm}
                </Text>
              )}
            </View>

            {/* Actions */}
            <View className="flex-row justify-end gap-4 mt-4">
              <TouchableOpacity disabled={submitting} onPress={onClose}>
                <Text className="text-gray-700 text-base">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={submitting} onPress={onSubmit}>
                <Text
                  className={`text-base ${submitting ? "text-gray-400" : "text-blue-600"}`}
                >
                  {submitting ? "Saving…" : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ChangePasswordModal;
