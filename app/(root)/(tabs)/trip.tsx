// import ErrorFallback from "@/components/common/ErrorFallback";
// import LoadingSkeleton from "@/components/common/LoadingSkeleton";
// import { View, Text } from "react-native";

// const Home = () => {
//   const onPress = () => {};
//   return <ErrorFallback onPress={onPress} />;
// };

// export default Home;

// ----------------------------------------------------------

// import Collapsible from "react-native-collapsible";
// import CustomButton from "@/components/common/CustomButton";
// import DateInput from "@/components/trip/DateInput";
// import InputField from "@/components/common/InputField";
// import ScreenContainer from "@/components/common/ScreenContainer";
// import { ROUTES } from "@/constant/routes";
// import { ITripPlanInputs } from "@/types/type";
// import { router, Stack } from "expo-router";
// import { useForm } from "react-hook-form";
// import { TouchableOpacity, View, Text, Image } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import * as ImagePicker from "expo-image-picker";
// import { useState } from "react";
// import Accordion from "react-native-collapsible/Accordion";

// const Create = () => {
//   const {
//     control,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm<ITripPlanInputs>({
//     defaultValues: {
//       title: "",
//       destination: "",
//       startDate: new Date(),
//       endDate: undefined,
//       description: "",
//       imageUrl: undefined,
//     },
//   });

//   const [isCollapsed, setIsCollapsed] = useState(true);

//   const imageUrl = watch("imageUrl");
//   const onNextPress = (data: ITripPlanInputs) => {
//     console.log(data);
//     router.push({
//       pathname: ROUTES.ROOT.TRIPS.TRIP_PREVIEW,
//       params: {
//         title: data.title,
//         destination: data.destination,
//         startDate: data.startDate.toISOString(),
//         endDate: data.endDate.toISOString(),
//         description: data.description,
//         imageUrl: data.imageUrl,
//       },
//     });
//   };
//   const handleCancel = () => {
//     router.back();
//   };

//   const onSelectCoverImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//       quality: 1,
//       allowsEditing: true,
//       aspect: [16, 9],
//     });

//     console.log(result);

//     if (!result.canceled && result.assets.length > 0) {
//       const uri = result.assets[0].uri;
//       setValue("imageUrl", uri, { shouldValidate: true });
//     }
//   };

//   return (
//     <ScreenContainer>
//       <Stack.Screen options={{ headerRight: () => null }} />
//       <View className="py-1 px-4">
//         <TouchableOpacity onPress={onSelectCoverImage}>
//           {imageUrl ? (
//             <Image
//               source={{ uri: imageUrl }}
//               className="w-full aspect-[16/9] rounded-3xl mb-4"
//               resizeMode="cover"
//               accessibilityLabel="Cover Image"
//               alt="Trip Cover Image"
//             />
//           ) : (
//             <View className="w-full h-[120px] bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-300 mb-4">
//               <Icon name="camera" size={26} color="#0286FF" />
//               <Text className="font-JakartaSemiBold text-md text-primary-500 mt-2">
//                 Select Cover Image
//               </Text>
//             </View>
//           )}
//         </TouchableOpacity>
//         <InputField
//           control={control}
//           name="title"
//           label="Title"
//           labelStyle="text-[20px] mb-0"
//           placeholder="Trip name..."
//           inputStyle="h-10 py-1 px-4"
//           maxLength={50}
//         />
//         <InputField
//           control={control}
//           name="destination"
//           label="Destination"
//           labelStyle="text-[20px] mb-0"
//           placeholder="Where to go..."
//           inputStyle="h-10 py-1 px-4"
//           maxLength={100}
//         />
//         <View className="flex-row">
//           <View className="flex-1 mr-2">
//             <DateInput
//               control={control}
//               name="startDate"
//               label="From"
//               minimumDate={new Date()}
//               rules={{ required: "Start date is required" }}
//             />
//           </View>
//           <View className="flex-1 ml-2">
//             <DateInput
//               control={control}
//               name="endDate"
//               label="To"
//               minimumDate={watch("startDate")}
//               rules={{
//                 required: "End date is required",
//                 validate: (d: Date) =>
//                   d >= watch("startDate") ||
//                   "End date must be after start date",
//               }}
//             />
//           </View>
//         </View>
//         <InputField
//           control={control}
//           name="description"
//           label="Description"
//           labelStyle="text-[20px] mb-0"
//           placeholder="Add a description"
//           multiline
//           numberOfLines={4}
//           maxLength={300}
//           inputStyle="h-28 text-top"
//           textAlignVertical="top"
//         />
//       </View>
//       <View className="flex-row space-x-4">
//         <CustomButton
//           title="Cancel"
//           onPress={handleCancel}
//           bgVariant="outline"
//           textVariant="primary"
//           className="flex-1 rounded-xl"
//         />
//         <CustomButton
//           title="Next"
//           onPress={handleSubmit(onNextPress)}
//           className="flex-1 rounded-xl"
//         />
//       </View>
//     </ScreenContainer>
//   );
// };

// export default Create;

// ----------------------------------------------------------

import CustomButton from "@/components/common/CustomButton";
import DateInput from "@/components/trip/DateInput";
import InputField from "@/components/common/InputField";
import ScreenContainer from "@/components/common/ScreenContainer";
import { ROUTES } from "@/constant/routes";
import { ITripPlanInputs } from "@/types/type";
import { router, Stack } from "expo-router";
import { useForm } from "react-hook-form";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const sectionList = [
  "cover",
  "title",
  "destination",
  "dates",
  "description",
] as const;
type SectionKey = (typeof sectionList)[number];

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

  // Multi-section expand/collapse
  const [expandedSections, setExpandedSections] = useState<
    Record<SectionKey, boolean>
  >({
    cover: true,
    title: true,
    destination: true,
    dates: true,
    description: true,
  });

  // Animation for open/close
  const toggleSection = (key: SectionKey) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const imageUrl = watch("imageUrl");
  const onNextPress = (data: ITripPlanInputs) => {
    router.push({
      pathname: ROUTES.ROOT.TRIPS.TRIP_PREVIEW,
      params: {
        title: data.title,
        destination: data.destination,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate?.toISOString(),
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

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setValue("imageUrl", uri, { shouldValidate: true });
    }
  };

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerRight: () => null }} />
      <View className="py-1 px-4">
        {/* COVER IMAGE */}
        <TouchableOpacity
          onPress={() => toggleSection("cover")}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center mb-1">
            <Text className="text-xl font-JakartaSemiBold mr-2">
              Cover Image
            </Text>
            <Icon
              name={expandedSections.cover ? "chevron-up" : "chevron-down"}
              size={16}
            />
          </View>
        </TouchableOpacity>
        {expandedSections.cover && (
          <TouchableOpacity onPress={onSelectCoverImage}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                className="w-full aspect-[16/9] rounded-3xl mb-4"
                resizeMode="cover"
                accessibilityLabel="Cover Image"
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
        )}

        {/* TITLE */}
        <TouchableOpacity
          onPress={() => toggleSection("title")}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center mb-1">
            <Text className="text-xl font-JakartaSemiBold mr-2">Title</Text>
            <Icon
              name={expandedSections.title ? "chevron-up" : "chevron-down"}
              size={16}
            />
          </View>
        </TouchableOpacity>
        {expandedSections.title && (
          <InputField
            control={control}
            name="title"
            placeholder="Trip name..."
            inputStyle="h-10 py-1 px-4"
            maxLength={50}
          />
        )}

        {/* DESTINATION */}
        <TouchableOpacity
          onPress={() => toggleSection("destination")}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center mb-1 mt-2">
            <Text className="text-xl font-JakartaSemiBold mr-2">
              Destination
            </Text>
            <Icon
              name={
                expandedSections.destination ? "chevron-up" : "chevron-down"
              }
              size={16}
            />
          </View>
        </TouchableOpacity>
        {expandedSections.destination && (
          <InputField
            control={control}
            name="destination"
            placeholder="Where to go..."
            inputStyle="h-10 py-1 px-4"
            maxLength={100}
          />
        )}

        {/* DATES */}
        <TouchableOpacity
          onPress={() => toggleSection("dates")}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center mb-1 mt-2">
            <Text className="text-xl font-JakartaSemiBold mr-2">Dates</Text>
            <Icon
              name={expandedSections.dates ? "chevron-up" : "chevron-down"}
              size={16}
            />
          </View>
        </TouchableOpacity>
        {expandedSections.dates && (
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
        )}

        {/* DESCRIPTION */}
        <TouchableOpacity
          onPress={() => toggleSection("description")}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center mb-1 mt-2">
            <Text className="text-xl font-JakartaSemiBold mr-2">
              Description
            </Text>
            <Icon
              name={
                expandedSections.description ? "chevron-up" : "chevron-down"
              }
              size={16}
            />
          </View>
        </TouchableOpacity>
        {expandedSections.description && (
          <InputField
            control={control}
            name="description"
            placeholder="Add a description"
            multiline
            numberOfLines={4}
            maxLength={300}
            inputStyle="h-28 text-top"
            textAlignVertical="top"
          />
        )}
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

// ----------------------------------------------------------
