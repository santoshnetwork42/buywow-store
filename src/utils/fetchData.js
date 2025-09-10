import awsmobile from "@/aws-exports";
import { cachedFetch } from "@/utils/cfCache";
const fetchData = async (query = "", variables = {}, options = {}) => {
  const response = await cachedFetch(
    awsmobile.aws_appsync_graphqlEndpoint,
    {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        "x-api-key": awsmobile.aws_appsync_apiKey,
        accept: "*/*",
        "content-type": "application/json; charset=UTF-8",
      },
      ...options,
    },
    { ttl: options?.cacheTtl ?? 300 }, // Increased default cache to 5 minutes for better subrequest performance
  );
  const data = await response.json();
  return data.data;
};

export default fetchData;
