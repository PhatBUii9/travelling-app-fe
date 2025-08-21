// app/(root)/(tabs)/profile.tsx
import React, { useMemo, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";

import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/constant/routes";

import Avatar from "@/components/profile/Avatar";
import Section from "@/components/profile/Section";
import Row from "@/components/profile/Row";
import Stat from "@/components/profile/Stat";
import EditProfileModal from "@/components/profile/EditProfileModal";

import useProfileStats from "@/hooks/useProfileStats";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import { removeAllTrips } from "@/utils/tripStorage";

const ProfileScreen = () => {
  const router = useRouter();
  const auth = useAuth();

  const { totals, loading } = useProfileStats();

  const [notifEnabled, setNotifEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [changeOpen, setChangeOpen] = useState(false);

  const initialsName = useMemo(
    () => auth.user?.username ?? "Traveler",
    [auth.user?.username],
  );

  const onClearData = () => {
    Alert.alert(
      "Clear Local Data",
      "This removes all saved trips and metadata (favorites, recently viewed).",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await removeAllTrips();
            Alert.alert("Done", "All local trip data cleared.");
          },
        },
      ],
    );
  };

  const onSignOut = async () => {
    await auth.logout();
    router.push(ROUTES.AUTH.SIGN_IN);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Edit profile modal */}
      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
      <ChangePasswordModal
        open={changeOpen}
        onClose={() => setChangeOpen(false)}
        token={auth.token}
      />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header / identity */}
        <View className="flex-row items-center mb-6">
          <Avatar name={initialsName} />
          <View className="ml-3">
            <Text className="text-lg font-JakartaBold text-gray-900">
              {auth.user?.username ?? "Traveler"}
            </Text>
            {auth.user?.email ? (
              <Text className="text-xs text-gray-500">{auth.user.email}</Text>
            ) : (
              <Text className="text-xs text-gray-400">No email added</Text>
            )}
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={() => setEditOpen(true)}
            className="bg-white px-3 py-2 rounded-xl border border-gray-200"
          >
            <Text className="text-blue-600 text-sm">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row mb-8">
          <Stat label="Trips" value={loading ? "…" : totals.trips} />
          <Stat label="Favorites" value={loading ? "…" : totals.favs} />
          <Stat label="Viewed" value={loading ? "…" : totals.recent} />
        </View>

        {/* Preferences */}
        <Section title="Preferences">
          <Row
            icon={<Icon name="bell" size={18} color="#111827" />}
            title="Notifications"
            subtitle={notifEnabled ? "Enabled" : "Disabled"}
            onPress={() => setNotifEnabled((v) => !v)}
          >
            <Switch value={notifEnabled} onValueChange={setNotifEnabled} />
          </Row>

          <Row
            icon={<Icon name="moon" size={18} color="#111827" />}
            title="Dark Mode"
            subtitle={darkMode ? "On" : "Off"}
            onPress={() => setDarkMode((v) => !v)}
          >
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </Row>
        </Section>

        {/* Account */}
        <Section title="Account">
          <Row
            icon={<Icon name="user" size={18} color="#111827" />}
            title="Edit Profile"
            onPress={() => setEditOpen(true)}
          />
          <Row
            icon={<Icon name="lock" size={18} color="#111827" />}
            title="Change Password"
            subtitle="Update your password"
            onPress={() => setChangeOpen(true)}
          />
        </Section>

        {/* Data Management */}
        <Section title="Data">
          <Row
            icon={<Icon name="trash-2" size={18} color="#DC2626" />}
            title="Clear local data"
            danger
            onPress={onClearData}
          />
        </Section>

        {/* About / Support */}
        <Section title="About">
          <Row
            icon={<Icon name="info" size={18} color="#111827" />}
            title="Help & Support"
            subtitle="FAQ, contact"
          />
          <Row
            icon={<Icon name="shield" size={18} color="#111827" />}
            title="Privacy Policy"
          />
        </Section>

        {/* Sign out */}
        <TouchableOpacity
          onPress={onSignOut}
          className="mt-4 bg-white rounded-2xl px-4 py-4 items-center border border-gray-200"
        >
          <Text className="text-red-600 font-JakartaBold">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
