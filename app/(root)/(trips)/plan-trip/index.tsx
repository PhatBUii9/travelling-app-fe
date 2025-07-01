import {
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import ScreenContainer from "@/components/common/ScreenContainer";
import { images } from "@/constant";
import CustomButton from "@/components/common/CustomButton";
import { useState } from "react";
import { Dimensions } from "react-native";
import ProgressBar from "@/components/common/PorgressBar";
import { router } from "expo-router";
import { ROUTES } from "@/constant/routes";

const renderOption = (
  label: string,
  description: string,
  isSelected: boolean,
  onPress: () => void,
) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      className={`justify-center items-center rounded-2xl border w-full h-[72px] px-4 mb-4 ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
      }`}
    >
      <Text className="font-JakartaBold text-md">{label}</Text>
      <Text className="text-sm text-secondary-500">{description}</Text>
    </View>
  </TouchableWithoutFeedback>
);

const TripWizardStartScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const imageSize = screenWidth * 0.65;
  const [isScratchSelected, setIsScratchSelected] = useState<boolean | null>(
    null,
  );

  const handleContinue = () => {
    if (isScratchSelected === null) {
      return;
    } else if (isScratchSelected) {
      router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_CITY);
    } else {
      Alert.alert("⚠️ Warning", "This feature is not available!");
    }
  };

  return (
    <>
      <ProgressBar currentStep={1} totalSteps={6} />
      <ScreenContainer>
        <View className="flex-1 items-center py-1 px-4">
          <View className="items-center mx-8 mb-10">
            <Text className="font-JakartaExtraBold text-heading-lg mb-3">
              Create Trip
            </Text>

            <Text className="text-base text-center font-JakartaMedium text-secondary-700 ">
              Get started with building a trip to the best spots.
            </Text>
          </View>

          <Image
            source={images.startTrip}
            style={{ width: imageSize, height: imageSize }}
            resizeMode="cover"
            accessibilityLabel="Trip planning illustration"
            accessibilityRole="image"
            accessibilityHint="Visual representation of trip creation"
          />

          <View className="w-full mt-8 mb-4">
            {renderOption(
              "Start from scratch",
              "Build your trip from ground up",
              isScratchSelected === true,
              () => setIsScratchSelected(true),
            )}
            {renderOption(
              "Start from a recommended city",
              "Get suggestions and ideas for top destinations",
              isScratchSelected === false,
              () => setIsScratchSelected(false),
            )}
          </View>
        </View>
        <View className="w-full px-4">
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            disabled={isScratchSelected === null}
            className={`rounded-xl ${
              isScratchSelected === null ? "bg-gray-300" : "bg-blue-500"
            }`}
            textVariant="default"
          />
          {isScratchSelected === null && (
            <Text className="text-sm text-red-500 text-center">
              Please select an option to continue.
            </Text>
          )}
        </View>
      </ScreenContainer>
    </>
  );
};

export default TripWizardStartScreen;
