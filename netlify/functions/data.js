import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("guitar-practice-store");

  // שליפת הנתונים (GET)
  if (req.method === "GET") {
    try {
      const data = await store.get("app_data", { type: "json" });
      return new Response(JSON.stringify(data || null), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }

  // שמירת ועדכון הנתונים (POST)
  if (req.method === "POST") {
    try {
      const payload = await req.json();
      await store.setJSON("app_data", payload);
      return new Response(JSON.stringify({ success: true, timestamp: Date.now() }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config = {
  path: "/api/data"
};
