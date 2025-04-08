// api/generate.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    return res.status(200).json({ response: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate content" });
  }
}
