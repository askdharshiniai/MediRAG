const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const generateAnswerFromContext = async (query, context) => {
  const togetherKey = process.env.TOGETHER_API_KEY;

  const prompt = `
You are a helpful and knowledgeable medical assistant.

Use the following context from research articles and documents to provide a detailed, human-like answer.

Context:
${context}

Question:
${query}

Answer:
`;

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "Qwen/Qwen2.5-7B-Instruct-Turbo",  // light, fast, smart
        messages: [
          { role: "system", content: "You are a medical assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
        max_tokens: 700,
      },
      {
        headers: {
          Authorization: `Bearer ${togetherKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const output = response.data.choices[0].message.content;
    return output.trim();
  } catch (err) {
    console.error("🔥 Together.ai LLM error:", err.response?.data || err.message);
    return "Sorry,failed to generate a response.";
  }
};

module.exports = generateAnswerFromContext;
