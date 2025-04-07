import { InputFieldProps } from "@/types/type";
import React from "react";
import { Controller } from "react-hook-form";
import {
  KeyboardAvoidingView,
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

const InputField = ({
  control,
  name,
  rules = {},
  placeholder,
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...Props
}: InputFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue=""
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="my-2 w-full">
                  {label && (
                    <Text
                      className={`text-black text-xl font-JakartaSemiBold mb-3 ${labelStyle}`}
                    >
                      {label}
                    </Text>
                  )}
                  <View
                    className={`bg-white w-full border ${
                      error ? "border-red-500" : "border-gray-300"
                    } rounded-xl p-2 my-2 ${containerStyle}`}
                  >
                    {icon && (
                      <Image
                        source={icon}
                        className={`w-6 h-6 ml-4 ${iconStyle}`}
                      />
                    )}
                    <TextInput
                      className={`text-black h-50 p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
                      secureTextEntry={secureTextEntry}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder={placeholder}
                      {...Props}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>

              {error && (
                <Text className="text-red-300 self-stretch">
                  {error.message || "Error"}
                </Text>
              )}
            </>
          </KeyboardAvoidingView>
        );
      }}
    />
  );
};

export default InputField;
