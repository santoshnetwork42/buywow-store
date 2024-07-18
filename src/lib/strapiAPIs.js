import { getClient } from "@/lib/client";
import { landingPage } from "@/graphql/strapi/queries";

export const landingPageCMSAPI = async () => {
  try {
    const responseData = await getClient().query({
      query: landingPage,
      context: {
        fetchOptions: {
          next: { revalidate: 0 },
        },
      },
    });

    return responseData;
  } catch (err) {
    console.error(err);
  }
};
