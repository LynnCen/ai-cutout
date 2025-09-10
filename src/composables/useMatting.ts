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

      // 使用固定的测试图片作为原图显示
      const testImageUrl = 'https://insmind-gdesign-dam-fat-static.xsbapp.com/33665218580841555/8715d817ef2f44e4a0abdb094119692f.png?x-oss-process=image/resize,w_3000,h_3000,type_6/interlace,1';
      
      // 生成结果对象
      const mattingResult: MattingResult = {
        id: generateId(),
        originalImage: testImageUrl,
        resultImage: result.resultImage || testImageUrl,
        maskImage: result.maskImage,
        type,
        confidence: result.confidence,
        processingTime: Date.now() - startTime
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
  const processPresetImage = async (image: { url: string; name: string; type: MattingType }, type: MattingType = 'auto'): Promise<MattingResult> => {
    try {
      status.value = 'processing';
      error.value = null;
      progress.value = 0;

      // 调用Dify API
      const startTime = Date.now();
      progress.value = 20;
      
      const result = await difyClient.processImage(image.url, type);
      progress.value = 80;

      // 生成结果对象
      const mattingResult: MattingResult = {
        id: generateId(),
        originalImage: image.url,
        resultImage: result.resultImage || image.url,
        maskImage: result.maskImage,
        type,
        confidence: result.confidence,
        processingTime: Date.now() - startTime
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
    clearError
  };
}
