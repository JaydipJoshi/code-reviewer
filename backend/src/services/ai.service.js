const HF_TOKEN = process.env.HF_API_KEY;

async function generateContent(prompt) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/codegen-350M-mono",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `You are a senior software engineer and code reviewer.

1. Detect the programming language of the provided code.
2. Review it according to best practices of that language.
3. Identify bugs, security issues, inefficiencies.
4. Suggest improvements with corrected examples.

Code:
${prompt}`
        }),
      }
    );

    const data = await response.json();

    // Handle different response formats safely
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
