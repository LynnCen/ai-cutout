import { ref, readonly } from 'vue';
import { DifyClient } from '@/services/dify';
import { fileToDataURL, generateId } from '@/utils/image';
import type { MattingResult, MattingType, ProcessingStatus } from '@/types';

export function useMatting() {
  const difyClient = new DifyClient();

  // 状态管理
  const status = ref<ProcessingStatus>('idle');
  const progress = ref(0);
  const error = ref<string | null>(null);
  const results = ref<MattingResult[]>([]);

  // 处理单张图片
  const processImage = async (file: File, type: MattingType = 'auto'): Promise<MattingResult> => {
    try {
      status.value = 'processing';
      error.value = null;
      progress.value = 0;

      // 转换为DataURL
      const imageDataUrl = await fileToDataURL(file);
      progress.value = 20;

      // 调用Dify API
      const startTime = Date.now();
      const result = await difyClient.processImage(imageDataUrl, type);
      progress.value = 80;

      // 使用原始图片的DataURL作为原图显示
      const originalImageUrl = imageDataUrl;

      // 生成结果对象
      const mattingResult: MattingResult = {
        id: generateId(),
        originalImage: originalImageUrl,
        resultImage: result.resultImage || originalImageUrl,
        maskImage: result.maskImage,
        type,
        confidence: result.confidence,
        processingTime: Date.now() - startTime,
      };

      // 添加到结果列表
      results.value.unshift(mattingResult);

      progress.value = 100;
      status.value = 'completed';

      return mattingResult;
    } catch (err) {
      status.value = 'failed';
      error.value = err instanceof Error ? err.message : '处理失败';
      throw err;
    }
  };

  // 处理预设图片
  const processPresetImage = async (image: {
    url: string;
    name: string;
    type: MattingType;
  }): Promise<MattingResult> => {
    try {
      status.value = 'processing';
      error.value = null;
      progress.value = 0;

      // 调用Dify API - 使用预设图片自带的类型，而不是传入的type参数
      const startTime = Date.now();
      progress.value = 20;

      const actualType = image.type; // 使用预设图片的类型
      const result = await difyClient.processImage(image.url, actualType);
      progress.value = 80;

      // 生成结果对象
      const mattingResult: MattingResult = {
        id: generateId(),
        originalImage: image.url,
        resultImage: result.resultImage || image.url,
        maskImage: result.maskImage,
        type: actualType, // 使用实际的类型
        confidence: result.confidence,
        processingTime: Date.now() - startTime,
      };

      // 添加到结果列表
      results.value.unshift(mattingResult);

      progress.value = 100;
      status.value = 'completed';

      return mattingResult;
    } catch (err) {
      status.value = 'failed';
      error.value = err instanceof Error ? err.message : '处理失败';
      throw err;
    }
  };

  // 重置状态
  const reset = () => {
    status.value = 'idle';
    progress.value = 0;
    error.value = null;
  };

  // 清除结果
  const clearResults = () => {
    results.value = [];
  };

  // 删除单个结果
  const removeResult = (id: string) => {
    const index = results.value.findIndex(r => r.id === id);
    if (index > -1) {
      results.value.splice(index, 1);
    }
  };

  // 清除错误
  const clearError = () => {
    error.value = null;
  };

  return {
    // 状态
    status: readonly(status),
    progress: readonly(progress),
    error: readonly(error),
    results: readonly(results),

    // 方法
    processImage,
    processPresetImage,
    reset,
    clearResults,
    removeResult,
    clearError,
  };
}
