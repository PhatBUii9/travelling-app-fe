import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";
import { icons } from "@/constant";
import { DateInputProps } from "@/types/type";

const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  control,
  rules,
  minimumDate,
  maximumDate,
  iconStyle = "",
  className = "",
  labelStyle = "",
  containerStyle = "",
}) => {
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={undefined}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View className={`my-2 w-full ${className}`}>
          {label && (
            <Text
              className={`text-black text-xl font-JakartaSemiBold mb-3 ${labelStyle}`}
            >
              {label}
            </Text>
          )}

          <View
            className={`flex-row items-center w-full border rounded-xl p-2 my-2 ${
              error ? "border-red-500" : "border-gray-300"
            } ${containerStyle}`}
          >
            <Image
              source={icons.calendar}
              className={`w-6 h-6 ml-4 ${iconStyle}`}
            />
            <DateTimePicker
              testID="dateTimePicker"
              value={value ?? new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "default" : "calendar"}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                setShow(false);
                if (event.type === "set" && selectedDate) {
                  onChange(selectedDate);
                }
              }}
            />
          </View>

          {error && <Text className="text-red-500 mt-1">{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default DateInput;
