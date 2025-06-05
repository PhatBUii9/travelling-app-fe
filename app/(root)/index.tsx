import { Redirect } from "expo-router";
import { ROUTES } from "@/constant/routes";

const Home = () => {
  return <Redirect href={ROUTES.ROOT.TABS.DASHBOARD} />;
};

export default Home;
