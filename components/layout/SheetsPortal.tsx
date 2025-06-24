// components/SheetsPortal.tsx
import ActionSheet from "react-native-actions-sheet";
import TripActionSheet from "../trip/TripActionSheet";

const SheetsPortal = () => {
  return (
    <>
      <ActionSheet
        id="trip-actions"
        gestureEnabled={true}
        containerStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          minHeight: 150,
          maxHeight: 250,
        }}
      >
        <TripActionSheet />
      </ActionSheet>
      {/* <ActionSheet id="profile-actions">
        <ProfileActionSheet />
      </ActionSheet>
      <ActionSheet id="settings-actions">
        <SettingsActionSheet />
      </ActionSheet> */}
    </>
  );
};

export default SheetsPortal;
