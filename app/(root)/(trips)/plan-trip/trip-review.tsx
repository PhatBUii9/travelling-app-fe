import React from "react";
import TripSummaryHeader from "@/components/trip/trip-review/TripSummaryHeader";
import TripTitleEditModal from "@/components/trip/trip-review/TripTitleEditModal";
import { useState } from "react";
import { useTripPlanner } from "@/hooks/useTripPlanner";

const TripReview = () => {
  const { tripTitle, setTripTitle } = useTripPlanner();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <TripSummaryHeader
        title={tripTitle}
        subtitle="5–12 Jun 2025 • 8 days, 2 cities"
        onEdit={() => setEditOpen(true)}
      />
      <TripTitleEditModal
        visible={editOpen}
        initialTitle={tripTitle}
        onSave={(newTitle: string) => {
          setTripTitle(newTitle);
          setEditOpen(false);
        }}
        onCancel={() => setEditOpen(false)}
      />
      {/* ...rest of trip review UI */}
    </>
  );
};

export default TripReview;
