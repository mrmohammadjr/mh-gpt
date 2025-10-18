"use server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

export async function getGroqChatCompletion(message: string) {
  console.log(message);
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "moonshotai/kimi-k2-instruct-0905", // Use the current model :cite[9]
      temperature: 1,
      max_tokens: 8000, // Reduced for 70B model compliance :cite[7]
      top_p: 1,
      stream: false,
      stop: null,
    });

    // ... (the rest of your code for handling the stream is fine)
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