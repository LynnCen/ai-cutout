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
  workflow_run_id: string;
  task_id: string;
  data: {
    id: string;
    workflow_id: string;
    sequence_number: number;
    status: string;
    outputs: {
      content: string; // JSON字符串，包含资源信息
    };
    error: string | null;
    elapsed_time: number;
    total_tokens: number;
    total_steps: number;
    created_by: {
      id: string;
      user: string;
    };
    created_at: number;
    finished_at: number;
    exceptions_count: number;
    files: any[];
  };
}

// 解析后的内容资源
export interface ContentResource {
  type: string;
  resource: {
    uri: string;
    mimeType: string;
    text: string;
  };
}
