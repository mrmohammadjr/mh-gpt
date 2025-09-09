"use server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

export async function getGroqChatCompletion(message: string) {
  try {

    const chatCompletion = await groq.chat.completions.create({
  "messages": [
    {
      "role": "user",
      "content": message
    }
  ],
  "model": "deepseek-r1-distill-llama-70b",
  "temperature": 0.6,
  "max_completion_tokens": 4096,
  "top_p": 0.95,
  "stream": false,
  "stop": null
});
  console.log(chatCompletion.choices[0].message.content);
    return {
      message: chatCompletion.choices[0].message.content,
      status: 200,
    };
  } catch (error) {
    console.error("Groq API Error:", error);
    return {
      message: "Failed to get response. Please try again.",
      status: 500,
    };
  }
}
