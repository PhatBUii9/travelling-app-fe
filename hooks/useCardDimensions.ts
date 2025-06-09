import { useWindowDimensions } from "react-native";

export function useCardDimensions(
  fraction = 0.4,
  maxWidth = 240,
  aspectRatio = 1.1,
  imageRatio = 0.5
) {
  const { width } = useWindowDimensions();
  const raw = width * fraction;
  const cardWidth = Math.min(raw, maxWidth);
  return {
    cardWidth,
    cardHeight: cardWidth * aspectRatio,
    imageHeight: cardWidth * imageRatio,
  };
}
