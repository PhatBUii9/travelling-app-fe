import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import ScreenContainer from "@/components/ScreenContainer";
import { icons } from "@/constant";
import { ITripPlanInputs } from "@/types/type";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const create = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
          <View className="flex-1 pr-2">
            <InputField
              control={control}
              name="startDate"
              label="From"
              labelStyle="text-[20px] mb-0"
              placeholder="Start date"
              className="flex-1"
              inputStyle="h-10 py-1 px-4"
              containerStyle="border-gray-300"
              icon={icons.calendar}
            />
          </View>
          <View className="flex-1 pl-2">
            <InputField
              control={control}
              name="endDate"
              label="To"
              labelStyle="text-[20px] mb-0"
              placeholder="End date"
              inputStyle="h-10 py-1 px-4"
              className="flex-1"
              containerStyle="border-gray-300"
              icon={icons.calendar}
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
