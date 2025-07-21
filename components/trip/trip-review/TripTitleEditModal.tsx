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

  return <Modal visible={visible} transparent animationType="slide"></Modal>;
};

export default TripTitleEditModal;
