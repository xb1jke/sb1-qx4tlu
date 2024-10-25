export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface QueryConfig {
  model: string;
  messages: Message[];
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
}