export async function fetchWrapper<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);

    // Try parsing JSON safely
    const data = await response.json().catch(() => {
      throw new Error("Invalid JSON response");
    });

    if (!response.ok) {
      const errorMessage = data?.message || "Request failed";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error: any) {
    console.error("❌ Fetch Error:", error.message || error);
    throw new Error(error.message || "Network error occurred");
  }
}
