import React from "react";
import { Controller } from "react-hook-form";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import { InputFieldProps } from "@/types/type";

const InputField: React.FC<InputFieldProps> = ({
  control,
  name,
  rules = {},
  placeholder,
  label,
  labelStyle = "",
  icon,
  secureTextEntry = false,
  containerStyle = "",
  inputStyle = "",
  iconStyle = "",
  className = "",
  ...props
}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    defaultValue=""
    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
      <View className={`my-2 w-full ${className}`}>
        {label && (
          <Text
            className={`text-black text-xl font-JakartaSemiBold mb-3 ${labelStyle}`}
          >
            {label}
          </Text>
        )}

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            className={`flex-row items-center w-full border rounded-xl p-2 my-2 ${
              error ? "border-red-500" : "border-gray-300"
            } ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}

            <TextInput
              className={`text-black h-14 p-4 font-JakartaSemiBold text-[15px] flex-1 text-left ${inputStyle}`}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </TouchableWithoutFeedback>

        {error && (
          <Text className="text-red-300 self-stretch">
            {error.message || "Error"}
          </Text>
        )}
      </View>
    )}
  />
);

export default InputField;
