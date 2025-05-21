import { WithLoadingFunction } from "@/types/type";

export const withLoading: WithLoadingFunction = async (
  action,
  showLoading,
  hideLoading
) => {
  try {
    showLoading();
    await action();
  } catch (error) {
    console.error("❌ Error in withLoading:", error);
    throw error;
  } finally {
    hideLoading();
  }
};
