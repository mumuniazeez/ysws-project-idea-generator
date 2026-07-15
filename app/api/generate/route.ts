import { type ApiRequestBody } from "@/app/generator/page";
import hackclubAI from "@/lib/hackclubAI";
import { generateText } from "ai";

export type Idea = {
  title: string;
  shortDescription: string;
  longDescription: string;
  recommendedTechStack: string[];
};
export interface ProjectIdeas {
  ideas: Idea[];
}

export async function POST(request: Request) {
  const body: ApiRequestBody = await request.json();

  console.log(body);

  const { text } = await generateText({
    model: hackclubAI("google/gemini-3-flash-preview"),
    instructions: [
      {
        role: "system",
        content:
          `You are an AI powered Hack Club: You ship, We ship idea generator,
            You are to help the user to generate project ideas for their next YSWS. 
            The user will  provided a JSON format of information regarding the idea they want.
            You will return a "JSON output only" matching the schema below
            
            { 
                ideas: [
                        {
                            "title": "string"
                            shortDescription: "string"
                            longDescription: "string"
                            recommendedTechStack: ["string"]
                        }
                ]
            }
          `.trim(),
      },
    ],
    prompt: `
    Below is a JSON containing information for the kind of idea i want, give me some ideas i can build for my next YSWS project

    ${JSON.stringify(body)}
    `.trim(),
  });

  console.log(text);

  return Response.json(JSON.parse(text));
}
