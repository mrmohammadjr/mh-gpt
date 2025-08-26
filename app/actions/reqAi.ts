"use server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
});

export async function getGroqChatCompletion(message: string) {
  try {

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "llama3-70b-8192", // Corrected model name
    });

    return {
      message: chatCompletion.choices[0]?.message?.content || "",
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
