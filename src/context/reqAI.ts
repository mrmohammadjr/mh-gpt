// features/dataSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Groq } from "groq-sdk";

type AIResponse = {
  text: string;
  finish_reason: "stop";
  model: string;
  server: "backup-A";
};

interface DataState {
  aiResponse: AIResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DataState = {
  aiResponse: null,
  status: "idle",
  error: null,
};

export const fetchAIResponse = createAsyncThunk(
  "ai/fetchResponse",
  async (userMessage: string): Promise<AIResponse> => {
    try {
      const groq = new Groq({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
      });
      let fullResponse = "";

      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: userMessage,
            },
          ],
          model: "deepseek-r1-distill-llama-70b",
          temperature: 0.6,
          max_completion_tokens: 4096,
          top_p: 0.95,
          stream: true,
          stop: null,
        });

        for await (const chunk of chatCompletion) {
          try {
            const content = chunk.choices[0]?.delta?.content || "";
            fullResponse += content;
          } catch (chunkError) {
            console.error("Error processing chunk:", chunkError);
            throw new Error("Failed to process response chunk");
          }
        }

        return {
          text: fullResponse,
          finish_reason: "stop",
          model: "deepseek-r1-distill-llama-70b",
          server: "backup-A",
        };
      } catch (apiError) {
        console.error("API Error:", apiError);
        throw new Error("Failed to get response from AI service");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
);

const dataSlice = createSlice({
  name: "aiData",
  initialState,
  reducers: {
    clearAIResponse: (state) => {
      state.aiResponse = null;
      state.error = null;
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIResponse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAIResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aiResponse = action.payload;
      })
      .addCase(fetchAIResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const { clearAIResponse } = dataSlice.actions;
export default dataSlice.reducer;
