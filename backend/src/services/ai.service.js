import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // name doesn't matter, value must be OpenAI key
});

async function generateContent(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a senior code reviewer with 7+ years of experience..."
      },
      {
        role: "user",
        content: prompt
      }
    ],
  });

  return response.choices[0].message.content;
}

export default generateContent;
