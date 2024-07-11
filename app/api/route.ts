import { AssistantResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const input: {
      threadId: string | null;
      message: string;
    } = await req.json();

    // validate input
    if (!input.message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
      });
    }

    // create a new thread if threadId is not provided
    const threadId =
      input.threadId ?? (await openai.beta.threads.create({})).id;

    // create a new message in the thread
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
        // create and stream the assistant's response
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
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
