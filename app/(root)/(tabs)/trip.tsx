import ErrorFallback from "@/components/common/ErrorFallback";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { View, Text } from "react-native";

const Home = () => {
  const onPress = () => {};
  return <ErrorFallback onPress={onPress} />;
};

export default Home;
