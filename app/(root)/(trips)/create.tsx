import CustomButton from "@/components/common/CustomButton";
import DateInput from "@/components/trip/DateInput";
import InputField from "@/components/common/InputField";
import ScreenContainer from "@/components/common/ScreenContainer";
import { ROUTES } from "@/constant/routes";
import { ITripPlanInputs } from "@/types/type";
import { router, Stack } from "expo-router";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

const Create = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ITripPlanInputs>({
    defaultValues: {
      title: "",
      destination: "",
      startDate: new Date(),
      endDate: undefined,
      description: "",
      imageUrl: undefined,
    },
  });

  const imageUrl = watch("imageUrl");
  const onNextPress = (data: ITripPlanInputs) => {
    console.log(data);
    router.push({
      pathname: ROUTES.ROOT.TRIPS.TRIP_PREVIEW,
      params: {
        title: data.title,
        destination: data.destination,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        description: data.description,
        imageUrl: data.imageUrl,
      },
    });
  };
  const handleCancel = () => {
    router.back();
  };

  const onSelectCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: true,
      aspect: [16, 9],
    });

    console.log(result);

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setValue("imageUrl", uri, { shouldValidate: true });
    }
  };

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerRight: () => {} }} />
      <View className="py-1 px-4">
        <TouchableOpacity onPress={onSelectCoverImage}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              className="w-full aspect-[16/9] rounded-3xl mb-4"
              resizeMode="cover"
              accessibilityLabel="Cover Image"
              alt="Trip Cover Image"
            />
          ) : (
            <View className="w-full h-[120px] bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-300 mb-4">
              <Icon name="camera" size={26} color="#0286FF" />
              <Text className="font-JakartaSemiBold text-md text-primary-500 mt-2">
                Select Cover Image
              </Text>
            </View>
          )}
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
              minimumDate={new Date()}
              rules={{ required: "Start date is required" }}
            />
          </View>
          <View className="flex-1 ml-2">
            <DateInput
              control={control}
              name="endDate"
              label="To"
              minimumDate={watch("startDate")}
              rules={{
                required: "End date is required",
                validate: (d: Date) =>
                  d >= watch("startDate") ||
                  "End date must be after start date",
              }}
            />
          </View>
        </View>
        <InputField
          control={control}
          name="description"
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
          onPress={handleSubmit(onNextPress)}
          className="flex-1 rounded-xl"
        />
      </View>
    </ScreenContainer>
  );
};

export default Create;
