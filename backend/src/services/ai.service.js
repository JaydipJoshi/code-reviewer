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
Detect the programming language.
Review the code.
List issues clearly.
Suggest improvements.
Provide corrected examples when needed.`,
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
