import { images } from "@/constant";
import { Trip } from "@/types/type";
import { mockUsers } from "./mockUsers";

export const mockTrips: Trip[] = [
  {
    id: "1",
    title: "Summer Escape",
    destination: "Gold Coast, Australia",
    dates: "Dec 20 - Dec 27, 2025",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Gold_Coast_skyline_%28Unsplash%29.jpg/1200px-Gold_Coast_skyline_%28Unsplash%29.jpg", // Gold Coast beach
    createdAt: "2025-05-22T08:00:00Z",
    members: [
      mockUsers[0],
      mockUsers[1],
      mockUsers[2],
      mockUsers[3],
      mockUsers[4],
      mockUsers[5],
      mockUsers[6],
      mockUsers[7],
      mockUsers[8],
      mockUsers[9],
      mockUsers[10],
      mockUsers[11],
    ],
    status: "upcoming",
  },
  {
    id: "2",
    title: "Snowy Mountains Adventure",
    destination: "Perisher, NSW",
    dates: "Jul 10 - Jul 14, 2025",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Gold_Coast_skyline_%28Unsplash%29.jpg/1200px-Gold_Coast_skyline_%28Unsplash%29.jpg", // Perisher snow
    createdAt: "2025-04-05T09:30:00Z",
    members: [mockUsers[2]],
    status: "completed",
  },
  {
    id: "3",
    title: "City Break",
    destination: "Melbourne, Australia",
    dates: "Oct 15 - Oct 18, 2025",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Gold_Coast_skyline_%28Unsplash%29.jpg/1200px-Gold_Coast_skyline_%28Unsplash%29.jpg", // Melbourne skyline
    createdAt: "2025-04-10T10:30:00Z",
    members: [],
    status: "upcoming",
  },
  {
    id: "4",
    title: "Cultural Tour",
    destination: "Kyoto, Japan",
    dates: "Mar 10 - Mar 20, 2025",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Gold_Coast_skyline_%28Unsplash%29.jpg/1200px-Gold_Coast_skyline_%28Unsplash%29.jpg", // Kyoto temple
    createdAt: "2025-03-01T14:00:00Z",
    members: [mockUsers[3], mockUsers[2]],
    status: "completed",
  },
  {
    id: "5",
    title: "Tropical Getaway",
    destination: "Phu Quoc Island, Vietnam",
    dates: "Jun 5 - Jun 10, 2025",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Gold_Coast_skyline_%28Unsplash%29.jpg/1200px-Gold_Coast_skyline_%28Unsplash%29.jpg", // Phu Quoc beach
    createdAt: "2025-04-15T11:20:00Z",
    members: [mockUsers[4], mockUsers[5]],
    status: "upcoming",
  },
];
