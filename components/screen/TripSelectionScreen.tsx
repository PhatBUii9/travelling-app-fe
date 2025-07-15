import { FlatList, ListRenderItem, View, Text } from "react-native";
import ScreenContainer from "../common/ScreenContainer";
import SearchBar from "../common/SearchBar";
import ProgressBar from "../common/PorgressBar";
import BottomStickyButton from "../common/BottomStickyButton";
import TripLoadingSkeleton from "../card/TripLoadingSkeleton";

interface TripSelectionProps<T> {
  currentStep: number;
  totalStep: number;
  title: string;
  subtitle: string;
  searchTerm: string;
  data: T[];
  sectionTitle?: string;
  onSearchTermChange: (text: string) => void;
  selectedId?: string;
  selectedIds?: string[];
  renderItem: ListRenderItem<T>;
  onContinue: () => void;
  error?: string;
  isLoading?: boolean;
}

const TripSelectionScreen = <T,>({
  currentStep,
  totalStep = 6,
  title,
  subtitle,
  searchTerm,
  data,
  sectionTitle,
  onSearchTermChange,
  renderItem,
  onContinue,
  error,
  isLoading = false,
}: TripSelectionProps<T>) => {
  const SKELETON_COUNT = 4;
  const skeletonData = Array.from({ length: SKELETON_COUNT });

  return (
    <>
      <ProgressBar currentStep={currentStep} totalSteps={totalStep} />
      <ScreenContainer scrollable={false}>
        <View className="flex-1">
          {isLoading ? (
            <FlatList
              data={skeletonData}
              keyExtractor={(_, i) => `skel-${i}`}
              renderItem={() => <TripLoadingSkeleton />}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => (item as any).id}
              ItemSeparatorComponent={() => <View className="h-3" />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
                paddingTop: 8,
              }}
              ListHeaderComponent={
                <View className="mt-1 mb-6">
                  <View className="items-center mx-8 mb-6">
                    <Text className="font-JakartaExtraBold text-heading-lg mb-3 text-center">
                      {title}
                    </Text>
                    <Text className="text-base text-center font-JakartaMedium text-secondary-700 mb-3">
                      {subtitle}
                    </Text>
                  </View>

                  <SearchBar
                    placeholder="Search places..."
                    value={searchTerm}
                    onChangeText={onSearchTermChange}
                    className="mb-10"
                    testID="search-bar"
                  />

                  {sectionTitle && (
                    <Text className="text-heading-md font-JakartaSemiBold">
                      {sectionTitle}
                    </Text>
                  )}
                </View>
              }
              renderItem={renderItem}
              ListEmptyComponent={() => (
                <View className="w-full items-center mt-8">
                  <Text
                    className="text-center font-JakartaMedium text-md"
                    testID="no-result"
                  >
                    No result
                  </Text>
                </View>
              )}
            />
          )}
        </View>

        <BottomStickyButton
          title="Continue"
          onPress={onContinue}
          error={error}
        />
      </ScreenContainer>
    </>
  );
};

export default TripSelectionScreen;
