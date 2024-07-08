import { AssistantResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();

  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  const createdMessage = await openai.beta.threads.messages.create(
    threadId,
    {
      role: "user",
      content: input.message,
    },
    { signal: req.signal }
  );

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream }) => {
      const runStream = await openai.beta.threads.runs.createAndStream(
        threadId,
        {
          assistant_id:
            process.env.ASSISTANT_ID ??
            (() => {
              throw new Error("ASSISTANT_ID is not set");
            })(),
        },
        { signal: req.signal }
      );

      await forwardStream(runStream);
    }
  );
}
