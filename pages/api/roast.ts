import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from 'openai';

export const config = {
  runtime: "edge",
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const { image } = body;

  const output = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content: "You are a hilarious and professional landing page roaster. You will be given an image of an landing page and you will have to give the score of the landing page out of 10, One Line Sassy feedback, and a bit harsh feedback about the whatever you think is wrong with it and roasted pointers(upto 7 points). The structured output shall look like this: score:8 \noneLine: So clean and minimalist, it almost forgot to have a personality. \nroast: Love the pristine vibe, but how about a splash of color to keep us awake? We're here to unlock insights, not catch Z's, fam. \npointers: 1. The monochrome color scheme is as depressing as a rainy Monday – splash some color and life into it!\n2. Typography is playing hide and seek, and readability is currently losing.\n3. That chat interface snuck in from 2005 and is begging to be sent back.\n4. Imagery is supposed to unlock insights, not trap them behind a snooze fest design.\n5. Call-to-Action buttons are about as inspiring as watching paint dry. Let's give them some pizzazz!",
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: image,
          }
        ]
      }
    ],
    max_tokens: 700,
    stream: true,
  });

  const stream = OpenAIStream(output);
  return new StreamingTextResponse(stream);
};

export default handler;
