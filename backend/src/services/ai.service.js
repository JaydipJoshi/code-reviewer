import fetch from "node-fetch";

const HF_TOKEN = process.env.HF_API_KEY;

async function generateContent(prompt) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/codegen-350M-mono",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
        }),
      }
    );

    const data = await response.json();

    return data[0]?.generated_text || "No output";
  } catch (error) {
    console.error("HuggingFace Error:", error);
    throw new Error("AI generation failed");
  }
}

export default generateContent;
