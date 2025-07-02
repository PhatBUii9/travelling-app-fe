import { icons } from "@/constant";
import { DateCardProps } from "@/types/type";
import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const DateCard: React.FC<DateCardProps> = ({
  title,
  value,
  onChange,
  minDate,
  maxDate,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    onChange(selectedDate);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity
        className={`w-64 h-32 border-2 items-center justify-center rounded-xl px-2 mb-8 bg-white ${isDatePickerVisible ? "border-blue-500" : "border-gray-200"}`}
        style={{ minWidth: 250, maxWidth: 320 }}
        onPress={showDatePicker}
      >
        <Text className="font-JakartaSemiBold text-xl mb-2">{title}</Text>
        <View className="flex-row items-center w-full justify-center">
          <Image source={icons.calendar} className="w-6 h-6 mr-2" />
          <Text className="text-lg font-JakartaSemiBold text-black">
            {formatDate(value)}
          </Text>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        testID="dateTimePicker"
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={minDate}
        maximumDate={maxDate}
        date={value}
      />
    </View>
  );
};

export default DateCard;
