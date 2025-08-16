// app/trips/review/[id].tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  RefreshControl,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  router,
} from "expo-router";
import { ROUTES } from "@/constant/routes";
import { timeAgo } from "@/utils/time";
import {
  getTripById,
  updateTrip as updateTripStorage,
  deleteTrip as deleteTripStorage,
  markViewed,
} from "@/utils/tripStorage";
import TripCityBlock from "@/components/trip/trip-review/TripCityBlock";
import { TripDraft, CityBlock } from "@/types/type";
import Icon from "react-native-vector-icons/Feather";

// ---- helpers (date normalization if storage had strings) ----
const toDate = (v: Date | string) => (v instanceof Date ? v : new Date(v));
const fmtDate = (iso?: string | Date) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

export default function TripDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [trip, setTrip] = useState<TripDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [viewedAt, setViewedAt] = useState<string | undefined>();

  // Accordion state: cityId -> expanded?
  const [expandedById, setExpandedById] = useState<Record<string, boolean>>({});
  const setAllExpanded = (val: boolean) =>
    setExpandedById((prev) => {
      const next: Record<string, boolean> = {};
      (trip?.cities ?? []).forEach((c) => (next[c.cityId] = val));
      return next;
    });

  // Rename modal
  const [menuOpen, setMenuOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const coverSource = useMemo(() => {
    const first = trip?.cities?.[0]?.imageURL;
    return typeof first === "number"
      ? first
      : typeof first === "string"
        ? { uri: first }
        : require("@/assets/images/empty_trips.png");
  }, [trip?.cities]);

  const overallRange = useMemo(() => {
    if (!trip) return "No dates set";
    return trip.startDate && trip.endDate
      ? `${fmtDate(trip.startDate)} - ${fmtDate(trip.endDate)}`
      : "No dates set";
  }, [trip]);

  const load = useCallback(
    async (markOnce: boolean) => {
      if (!id) return;
      try {
        if (!refreshing) setLoading(true);
        const t = await getTripById(String(id));
        if (!t) {
          Alert.alert("Not found", "This trip no longer exists.", [
            { text: "OK", onPress: () => router.back() },
          ]);
          return;
        }
        setTrip(t);

        // initialize accordion map if needed
        setExpandedById((prev) => {
          if (Object.keys(prev).length) return prev;
          const init: Record<string, boolean> = {};
          (t.cities ?? []).forEach((c) => (init[c.cityId] = true)); // default expanded
          return init;
        });

        if (markOnce) {
          const ts = await markViewed(String(id));
          setViewedAt(ts);
        }
      } finally {
        setLoading(false);
      }
    },
    [id, refreshing],
  );

  // First mount (mark viewed once)
  useEffect(() => {
    load(true);
  }, [load]);

  // Refresh when coming back from edit screens
  useFocusEffect(
    useCallback(() => {
      load(false);
    }, [load]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load(false);
    setRefreshing(false);
  }, [load]);

  // ----- menu handlers -----
  const handleAddCity = () => {
    if (!trip) return;
    setMenuOpen(false);
    router.push({
      pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_CITY,
      params: { mode: "edit-saved", tripId: trip.id },
    });
  };

  const handleOpenRename = () => {
    if (!trip) return;
    setNewTitle(trip.title || "");
    setMenuOpen(false);
    setRenameOpen(true);
  };

  const handleRename = async () => {
    if (!trip) return;
    const title = newTitle.trim();
    if (!title) return;
    await updateTripStorage(trip.id, {
      title,
      updatedAt: new Date().toISOString(),
    });
    setRenameOpen(false);
    await load(false);
  };

  const handleDeleteTrip = () => {
    if (!trip) return;
    setMenuOpen(false);
    Alert.alert(
      "Delete Trip",
      "This will permanently delete the trip and its data.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteTripStorage(trip.id);
            router.back();
          },
        },
      ],
    );
  };

  // ----- city handlers for TripCityBlock -----
  const pushEdit = (pathname: string, cityId: string) =>
    router.push({
      pathname,
      params: { mode: "edit-saved", tripId: String(id), cityId },
    });

  const handleAdd = ({
    cityId,
    type,
  }: {
    cityId: string;
    type: "activity" | "restaurant" | "accommodation";
  }) => {
    const map = {
      activity: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACTIVITIES,
      restaurant: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_RESTAURANTS,
      accommodation: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACCOMMODATION,
    } as const;
    pushEdit(map[type], cityId);
  };

  const handleEdit = ({
    cityId,
    type,
  }: {
    cityId: string;
    type: "activity" | "restaurant" | "accommodation" | "date";
  }) => {
    const map = {
      activity: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACTIVITIES,
      restaurant: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_RESTAURANTS,
      accommodation: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACCOMMODATION,
      date: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_DATES,
    } as const;
    pushEdit(map[type], cityId);
  };

  const handleDeleteCity = async (cityId: string) => {
    if (!trip) return;
    Alert.alert("Remove City", "Remove this city and its selections?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          const nextCities = (trip.cities || []).filter(
            (c) => c.cityId !== cityId,
          );

          // recompute trip date range
          const patch: Partial<TripDraft> = {
            cities: nextCities as CityBlock[],
          };
          if (nextCities.length > 0) {
            const starts = nextCities
              .map((c) => toDate(c.startDate).getTime())
              .sort((a, b) => a - b);
            const ends = nextCities
              .map((c) => toDate(c.endDate).getTime())
              .sort((a, b) => a - b);
            patch.startDate = new Date(starts[0]).toISOString();
            patch.endDate = new Date(ends[ends.length - 1]).toISOString();
          } else {
            patch.startDate = "";
            patch.endDate = "";
          }
          patch.updatedAt = new Date().toISOString();

          await updateTripStorage(trip.id, patch);
          // also remove its accordion state
          setExpandedById((prev) => {
            const n = { ...prev };
            delete n[cityId];
            return n;
          });
          await load(false);
        },
      },
    ]);
  };

  if (loading && !trip) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="w-full h-44 bg-gray-200" />
        <View className="p-4">
          <View className="w-2/3 h-6 bg-gray-200 rounded mb-3" />
          <View className="w-1/2 h-4 bg-gray-200 rounded" />
        </View>
      </SafeAreaView>
    );
  }
  if (!trip) return null;

  return (
    <>
      <Stack.Screen
        options={{
          title: trip.title ?? "Trip Detail",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setMenuOpen(true)}
              style={{ paddingHorizontal: 10 }}
              accessibilityLabel="More options"
            >
              <Icon name="more-vertical" size={22} color="#111827" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* --- Header actions modal (simple cross-platform menu) --- */}
      <Modal visible={menuOpen} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuOpen(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <Text className="text-base font-semibold mb-2">Trip actions</Text>
            <TouchableOpacity className="py-3" onPress={handleAddCity}>
              <Text className="text-blue-600 text-base">Add City</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3" onPress={handleOpenRename}>
              <Text className="text-blue-600 text-base">Rename Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3"
              onPress={() => {
                setAllExpanded(true);
                setMenuOpen(false);
              }}
            >
              <Text className="text-blue-600 text-base">Expand all</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3"
              onPress={() => {
                setAllExpanded(false);
                setMenuOpen(false);
              }}
            >
              <Text className="text-blue-600 text-base">Collapse all</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3" onPress={handleDeleteTrip}>
              <Text className="text-red-600 text-base">Delete Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3"
              onPress={() => setMenuOpen(false)}
            >
              <Text className="text-gray-700 text-base">Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* --- Rename modal --- */}
      <Modal visible={renameOpen} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setRenameOpen(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
          }}
        >
          <View className="bg-white w-full rounded-2xl p-4">
            <Text className="text-lg font-semibold mb-3">Rename Trip</Text>
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Trip title"
              autoFocus
              style={{
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: Platform.OS === "ios" ? 10 : 8,
                marginBottom: 12,
              }}
            />
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity onPress={() => setRenameOpen(false)}>
                <Text className="text-gray-700 text-base">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRename}>
                <Text className="text-blue-600 text-base">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Cover */}
          <Image
            source={coverSource as any}
            className="w-full h-44"
            resizeMode="cover"
          />

          {/* Title + when viewed + range */}
          <View className="p-4 pb-1 flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-gray-900">
                {trip.title}
              </Text>
              {!!viewedAt && (
                <Text className="text-xs text-gray-400 mt-1">
                  Viewed {timeAgo(viewedAt)}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={onRefresh}
              className="bg-gray-100 px-3 py-2 rounded-lg"
            >
              <Text className="text-gray-700">Refresh</Text>
            </TouchableOpacity>
          </View>

          <View className="px-4">
            <Text className="text-sm text-gray-600 mb-3">{overallRange}</Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {(trip.cities || []).map((c, i) => (
                <View
                  key={`${c.cityId}-${i}`}
                  className="bg-gray-200 px-3 py-1 rounded-full"
                >
                  <Text className="text-gray-700 text-sm">{c.cityName}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* City blocks */}
          <View className="px-4 pb-24">
            {(trip.cities || []).map((c, i) => (
              <TripCityBlock
                key={`${c.cityId}-${i}`}
                cityId={c.cityId}
                cityName={c.cityName}
                country={c.country}
                startDate={toDate(c.startDate)}
                endDate={toDate(c.endDate)}
                activities={c.activities}
                restaurants={c.restaurants ?? []}
                accommodations={c.accommodations ?? []}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteCity}
                expanded={!!expandedById[c.cityId]}
                onToggleExpand={() =>
                  setExpandedById((prev) => ({
                    ...prev,
                    [c.cityId]: !prev[c.cityId],
                  }))
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
