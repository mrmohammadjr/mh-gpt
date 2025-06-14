// features/dataSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Groq } from "groq-sdk";

type AIResponse = {  // Renamed from Data to be more specific
  text: string;
  finish_reason: "stop";
  model: string;
  server: "backup-A";
};

interface DataState {
  aiResponse: AIResponse | null;  // Changed to store single response
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DataState = {
  aiResponse: null,  // Initialize as null
  status: "idle",
  error: null,
};

export const fetchAIResponse = createAsyncThunk(  // Renamed from fetchData
  "ai/fetchResponse",
  async (userMessage: string): Promise<AIResponse> => {  // Return single response
    const groq = new Groq({
      apiKey: "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",
      dangerouslyAllowBrowser: true,
    });
    let fullResponse = "";

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
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
    }

    return {
      text: fullResponse,
      finish_reason: "stop",
      model: "deepseek-r1-distill-llama-70b",
      server: "backup-A",
    };
  }
);

const dataSlice = createSlice({
  name: "aiData",
  initialState,
  reducers: {
    clearAIResponse: (state) => {  // Added reducer to clear response
      state.aiResponse = null;
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