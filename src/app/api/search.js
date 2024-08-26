const TTM_CLIENT_URL = process.env.TTM_CLIENT_URL;
const TTM_CLIENT_API_KEY = process.env.TTM_CLIENT_API_KEY;
const TTM_CLIENT_THRESHOLD = process.env.TTM_CLIENT_THRESHOLD;

export default async function Search(req, res) {
  if (!req.query.search) {
    return res.status(401).json({ message: "Search term is required" });
  }

  if (req.method !== "GET") {
    return res.status(404).json({ message: "POST /api/search not found" });
  }

  const response = await fetch(
    `${TTM_CLIENT_URL}/search?query=${req.query.search}&threshold=${TTM_CLIENT_THRESHOLD}`,
    {
      headers: {
        Authorization: `Bearer ${TTM_CLIENT_API_KEY}`,
      },
    },
  ).then((resp) => resp.json());

  res.json(response);
}
