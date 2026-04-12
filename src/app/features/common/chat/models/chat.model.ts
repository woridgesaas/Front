export interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    intent?: string;
    confidence?: number;
  }
  
  export interface ChatRequest {
    question: string;
    userId: string;
    role: string;
    tenant: string;
  }
  
  export interface ChatResponse {
    timestamp: string;
    data: {
      answer: string;
      intent: string;
      confidence: number;
    };
    message: string;
  }