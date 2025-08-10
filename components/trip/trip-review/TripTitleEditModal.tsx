import { TripTitleEditModalProps } from "@/types/type";
import React, { useState } from "react";
import { Modal, View, TextInput, Button, Text } from "react-native";

const TripTitleEditModal: React.FC<TripTitleEditModalProps> = ({
  visible,
  initialTitle,
  onSave,
  onCancel,
}) => {
  const TITLE_MAX_LENGTH = 20;
  const [title, setTitle] = useState(initialTitle);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center">
        <View className="bg-white rounded-xl p-5 w-[90%]">
          <Text className="text-lg font-bold mb-2">Edit Trip Title</Text>
          {/* Character count row */}
          <View className="flex-row justify-end mb-1">
            <Text
              className={`text-xs ${
                title.length >= TITLE_MAX_LENGTH
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {title.length}/{TITLE_MAX_LENGTH}
            </Text>
          </View>
          {/* Input */}
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Trip Title"
            className="border rounded px-3 py-2 mb-4"
            numberOfLines={2}
            maxLength={TITLE_MAX_LENGTH}
          />
          {/* Actions */}
          <View className="flex-row justify-between">
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Save" onPress={() => onSave(title.trim())} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TripTitleEditModal;
