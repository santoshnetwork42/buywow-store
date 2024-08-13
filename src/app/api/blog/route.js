import { wordpressAuth } from "@/lib/wordPressAPIs";

export async function POST(req, res) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: wordpressAuth,
      },
      method: "POST",
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error fetching data" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
