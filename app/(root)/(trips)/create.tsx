import CustomButton from "@/components/CustomButton";
import DateInput from "@/components/DateInput";
import InputField from "@/components/InputField";
import ScreenContainer from "@/components/ScreenContainer";
import { icons } from "@/constant";
import { ITripPlanInputs } from "@/types/type";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const create = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ITripPlanInputs>();

  const handleNext = () => {};
  const handleCancel = () => {};
  const onSelectCoverImage = () => {};

  return (
    <ScreenContainer>
      <View className="py-1 px-4">
        <TouchableOpacity onPress={onSelectCoverImage}>
          <View className="w-full h-[120px] bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-300 mb-4">
            <Icon name="camera" size={26} color="#0286FF" />
            <Text className="font-JakartaSemiBold text-md text-primary-500 mt-2">
              Select Cover Image
            </Text>
          </View>
        </TouchableOpacity>
        <InputField
          control={control}
          name="title"
          label="Title"
          labelStyle="text-[20px] mb-0"
          placeholder="Trip name..."
          inputStyle="h-10 py-1 px-4"
          maxLength={50}
        />
        <InputField
          control={control}
          name="destination"
          label="Destination"
          labelStyle="text-[20px] mb-0"
          placeholder="Where to go..."
          inputStyle="h-10 py-1 px-4"
          maxLength={100}
        />
        <View className="flex-row">
          <View className="flex-1 mr-2">
            <DateInput
              control={control}
              name="startDate"
              label="From"
              placeholder="Start date"
              minimumDate={new Date()}
              rules={{ required: "Start date is required" }}
            />
          </View>
          <View className="flex-1 ml-2">
            <DateInput
              control={control}
              name="endDate"
              label="To"
              placeholder="End date"
              minimumDate={watch("startDate")}
              rules={{
                required: "End date is required",
                validate: (d: Date) =>
                  d >= watch("startDate") || "End must be after start",
              }}
            />
          </View>
        </View>
        <InputField
          control={control}
          name="decription"
          label="Description"
          labelStyle="text-[20px] mb-0"
          placeholder="Add a description"
          multiline
          numberOfLines={4}
          maxLength={300}
          inputStyle="h-28 text-top"
          textAlignVertical="top"
        />
      </View>
      <View className="flex-row space-x-4">
        <CustomButton
          title="Cancel"
          onPress={handleCancel}
          bgVariant="outline"
          textVariant="primary"
          className="flex-1 rounded-xl"
        />
        <CustomButton
          title="Next"
          onPress={handleNext}
          className="flex-1 rounded-xl"
        />
      </View>
    </ScreenContainer>
  );
};

export default create;
