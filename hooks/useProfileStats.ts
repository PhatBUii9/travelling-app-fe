// hooks/useProfileStats.ts
import { useEffect, useState } from "react";
import {
  getTrips,
  getFavoriteTrips,
  getRecentlyViewedTrips,
} from "@/utils/tripStorage";

type Totals = { trips: number; favs: number; recent: number };

const useProfileStats = () => {
  const [totals, setTotals] = useState<Totals>({
    trips: 0,
    favs: 0,
    recent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const [all, fav, recent] = await Promise.all([
          getTrips(),
          getFavoriteTrips(),
          getRecentlyViewedTrips(50),
        ]);
        if (mounted) {
          setTotals({
            trips: all.length,
            favs: fav.length,
            recent: recent.length,
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { totals, loading };
};

export default useProfileStats;
