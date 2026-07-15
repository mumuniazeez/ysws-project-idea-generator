import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const hackclubAI = createOpenRouter({
  apiKey: process.env.HACKCLUB_AI_API_KEY,
  baseUrl: "https://ai.hackclub.com/proxy/v1",
});

export default hackclubAI