import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import path from "path";

const apiKey = "AIzaSyCmQcWhPNYe4WaZ2H33hBz3d-ueh8cS8po";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  tools: [
    {
      codeExecution: {},
    },
  ],
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(conversationHistory, prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    safety_settings: {
      HATE: "BLOCK_NONE",
      HARASSMENT: "BLOCK_NONE",
      SEXUAL: "BLOCK_NONE",
      DANGEROUS: "BLOCK_NONE",
    },
    history: conversationHistory,
  });

  console.log(chatSession.getHistory());
  console.log(prompt);
  const result = await chatSession.sendMessage(prompt);
  //console.log(result.response.text());
  return result.response.text();
}

export default run;
