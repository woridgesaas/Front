export interface ChatMessage {
  id:          string;
  content:     string;
  sender:      'user' | 'bot';
  timestamp:   Date;
  intent?:     string;
  confidence?: number;
}

export interface ChatRequest {
  question: string;
  // Kong injecte automatiquement :
  // X-User-Id, X-User-Role, X-Subdomain
  // via les headers — pas besoin dans le body
}

export interface ChatResponse {
  timestamp: string;
  data: {
    answer:     string;
    intent:     string;
    confidence: number;
  };
  message: string;
}