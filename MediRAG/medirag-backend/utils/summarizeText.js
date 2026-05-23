const axios = require("axios");

const summarizeText = async (text) => {
  const HF_URL =
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

  const headers = {
    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    const res = await axios.post(
      HF_URL,
      { inputs: text },
      {
        headers,
        timeout: 30000,
      }
    );

    const summary = res.data?.[0]?.summary_text;

    if (!summary) {
      throw new Error("Empty summary from Hugging Face");
    }

    return summary;
  } catch (err) {
    console.error(
      "❌ Hugging Face summarization failed:",
      err.response?.data || err.message
    );

    console.log("⚡ Using local fallback summary...");

    // LOCAL FALLBACK SUMMARY
    try {
      const keywords = [
        "hemoglobin",
        "hb",
        "wbc",
        "rbc",
        "platelet",
        "blood sugar",
        "glucose",
        "cholesterol",
        "creatinine",
        "bilirubin",
        "protein",
        "bp",
        "thyroid",
        "tsh",
        "vitamin",
        "iron",
        "calcium",
        "uric acid",
      ];

      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const importantLines = lines.filter((line) =>
        keywords.some((keyword) =>
          line.toLowerCase().includes(keyword.toLowerCase())
        )
      );

      // If medical keywords found
      if (importantLines.length > 0) {
        return `Medical Report Summary:\n\n${importantLines.join("\n")}`;
      }

      // Otherwise return shortened text
      return `Medical Report Summary:\n\n${text.substring(0, 500)}...`;
    } catch (fallbackErr) {
      console.error(
        "❌ Local fallback summary failed:",
        fallbackErr.message
      );

      return "Unable to summarize report.";
    }
  }
};

module.exports = summarizeText;
