import React, { useState } from "react";
import { Modal, View, TextInput, Button, Text } from "react-native";

interface TripTitleEditModalProps {
  visible: boolean;
  initialTitle: string;
  onSave: (newTitle: string) => void;
  onCancel: () => void;
}

const TripTitleEditModal: React.FC<TripTitleEditModalProps> = ({
  visible,
  initialTitle,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="bg-white p-6 rounded-2xl w-80">
          <Text className="font-bold text-lg mb-2">Edit Trip Title</Text>
          <TextInput
            className="border rounded-lg p-2 mb-4"
            value={title}
            onChangeText={setTitle}
            placeholder="Trip name"
            autoFocus
          />
          <View className="flex-row justify-end space-x-2">
            <Button title="Cancel" onPress={onCancel} color="#666" />
            <Button title="Save" onPress={() => onSave(title)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TripTitleEditModal;
