import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function generateContent(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content: `You are a senior software engineer and expert code reviewer.

Always format your response in this structure:

1. Detected Language
2. Issues Found (bullet points)
3. Improvements Suggested
4. Improved Code Example
5. Final Recommendation

Be concise but technically precise.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw new Error("AI generation failed");
  }
}

export default generateContent;
