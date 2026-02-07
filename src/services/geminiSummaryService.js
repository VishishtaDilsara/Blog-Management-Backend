import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSummaryAI = async (content) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
Summarize the following blog post in 3 concise sentences.
Do not add new information.

Blog content:
${content}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();
  } catch (error) {
    console.error("Gemini summary failed:", error.message);
    return content.slice(0, 200) + "..."; // fallback
  }
};
