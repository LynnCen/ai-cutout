// 抠图类型
export type MattingType = 'portrait' | 'product' | 'graphic' | 'auto';

// 处理状态
export type ProcessingStatus = 'idle' | 'processing' | 'completed' | 'failed';

// 抠图结果
export interface MattingResult {
  id: string;
  originalImage: string;
  resultImage: string;
  maskImage?: string;
  type: MattingType;
  confidence: number;
  processingTime: number;
}

// Dify API 响应
export interface DifyResponse {
  event: string;
  task_id: string;
  id: string;
  message_id: string;
  conversation_id: string;
  answer: string;
  data: {
    mask_image?: string;
    result_image?: string;
    type?: number;
    confidence?: number;
  };
}