import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
You are a senior code reviewer with 7+ years of experience.
Review code carefully.
Explain issues clearly.
Suggest improvements with examples.
Keep response structured and professional.
`
});

async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("AI generation failed");
  }
}

export default generateContent;
