import { GEOCODING_API_URL, GOOGLE_MAPS_API_KEY } from "@/config";

export const fetchCityAndState = async (pinCode) => {
  try {
    const url = new URL(GEOCODING_API_URL);
    url.searchParams.set("components", `postal_code:${pinCode}|country:IN`);
    url.searchParams.set("key", GOOGLE_MAPS_API_KEY);

    const response = await fetch(url);
    const { results } = await response.json();

    if (results && results.length > 0) {
      const { address_components } = results[0];
      let city, state;

      for (const component of address_components) {
        const { types, long_name, short_name } = component;
        if (
          !city &&
          (types.includes("locality") ||
            types.includes("administrative_area_level_2"))
        ) {
          city = long_name;
        }
        if (!state && types.includes("administrative_area_level_1")) {
          state = short_name;
        }
        if (city && state) break;
      }

      return { city: city || "", state: state || "" };
    }
    return { city: "", state: "" };
  } catch (error) {
    console.error("Error fetching city and state:", error);
    return { city: "", state: "" };
  }
};
