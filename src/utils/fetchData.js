import awsmobile from "@/aws-exports";

const fetchData = async (query = "", variables = {}, options = {}) => {
  const response = await fetch(awsmobile.aws_appsync_graphqlEndpoint, {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: {
      "x-api-key": awsmobile.aws_appsync_apiKey,
      accept: "*/*",
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-cache",
    },
    cache: "no-cache",
    // next: {
    //   revalidate: 600,
    // },
    // ...options
  });
  const data = await response.json();
  return data.data;
};

export default fetchData;
