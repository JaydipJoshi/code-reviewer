const HF_TOKEN = process.env.HF_API_KEY;

async function generateContent(prompt) {
  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/Salesforce/codegen-350M-mono",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `You are an expert code reviewer.
Detect the programming language.
Review the code.
List issues clearly.
Suggest improvements.

Code:
${prompt}`
        }),
      }
    );

    const data = await response.json();

    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text;
    }

    if (data.error) {
      return `HuggingFace Error: ${data.error}`;
    }

    return "Model did not return expected output.";

  } catch (error) {
    console.error("HuggingFace Error:", error);
    throw new Error("AI generation failed");
  }
}

export default generateContent;
