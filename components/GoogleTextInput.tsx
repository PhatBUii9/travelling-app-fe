import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";

interface GoogleInputProps {
  icon?: JSX.Element; // you can render your search icon here
  placeholder?: string;
  containerStyle?: string; // tailwind classes
  inputStyle?: object; // any extra inline styles
  onSubmit: (query: string) => void;
}

const GoogleTextInput: React.FC<GoogleInputProps> = ({
  icon,
  placeholder = "Where to go…",
  containerStyle = "",
  inputStyle,
  onSubmit,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    onSubmit(text.trim());
  };

  return (
    <View
      className={`flex-row items-center px-4 py-2 rounded-xl mb-5 bg-gray-100 ${containerStyle}`}
    >
      {icon && <View className="mr-4">{icon}</View>}
      <TextInput
        style={[styles.input, inputStyle]}
        value={text}
        placeholder={placeholder}
        placeholderTextColor="#888"
        returnKeyType="search"
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    padding: 0,
  },
});

export default GoogleTextInput;
