<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 头部 -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">智能抠图系统</h1>
          </div>
          <div class="text-sm text-gray-500">
            基于AI的专业图像抠图工具
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 左侧：上传和处理区域 -->
        <div class="space-y-6">
          <!-- 文件上传区域 -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">上传图片</h2>
            
            <!-- 拖拽上传区域 -->
            <div
              class="border-2 border-dashed rounded-lg p-8 text-center transition-colors"
              :class="isDragover 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
              @drop="handleDrop"
            >
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="mt-4">
                <label class="cursor-pointer">
                  <span class="text-base font-medium text-blue-600 hover:text-blue-500">
                    点击选择文件
                  </span>
                  <span class="text-gray-500"> 或拖拽到此处</span>
                  <input
                    type="file"
                    class="hidden"
                    accept="image/*"
                    multiple
                    @change="handleFileInput"
                  >
                </label>
              </div>
              <p class="text-sm text-gray-500 mt-2">
                支持 JPG、PNG、WebP 格式，单个文件不超过 10MB
              </p>
              <div class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p class="text-sm text-blue-700">
                  <span class="font-medium">测试模式：</span>
                  当前使用固定测试图片进行抠图演示
                </p>
              </div>
            </div>

            <!-- 已选择的文件 -->
            <div v-if="selectedFiles.length > 0" class="mt-4">
              <h3 class="text-sm font-medium text-gray-900 mb-2">
                已选择 {{ selectedFiles.length }} 个文件
              </h3>
              <div class="space-y-2">
                <div
                  v-for="(file, index) in selectedFiles"
                  :key="index"
                  class="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                  <span class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 处理选项 -->
          <div v-if="selectedFiles.length > 0" class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">处理选项</h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  抠图类型
                </label>
                <select
                  v-model="selectedType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="auto">自动识别</option>
                  <option value="portrait">人像抠图</option>
                  <option value="product">商品抠图</option>
                  <option value="graphic">图形抠图</option>
                </select>
              </div>

              <button
                @click="startProcessing"
                :disabled="status === 'processing'"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ status === 'processing' ? '处理中...' : '开始抠图' }}
              </button>
            </div>
          </div>

          <!-- 处理进度 -->
          <div v-if="status === 'processing'" class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">处理进度</h2>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>处理中...</span>
                <span>{{ progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${progress}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- 错误提示 -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">处理失败</h3>
                <p class="text-sm text-red-700 mt-1">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：结果展示区域 -->
        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-gray-900">
                处理结果 ({{ results.length }})
              </h2>
              <button
                v-if="results.length > 0"
                @click="clearResults"
                class="text-sm text-gray-500 hover:text-gray-700"
              >
                清空全部
              </button>
            </div>

            <!-- 结果列表 -->
            <div v-if="results.length > 0" class="space-y-4">
              <div
                v-for="result in results"
                :key="result.id"
                class="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex space-x-4">
                  <!-- 原图 -->
                  <div class="flex-1">
                    <h4 class="text-sm font-medium text-gray-900 mb-2">原图</h4>
                    <img
                      :src="result.originalImage"
                      alt="原图"
                      class="w-full h-32 object-cover rounded border"
                    >
                  </div>
                  
                  <!-- 结果图 -->
                  <div class="flex-1">
                    <h4 class="text-sm font-medium text-gray-900 mb-2">抠图结果</h4>
                    <img
                      :src="result.resultImage"
                      alt="抠图结果"
                      class="w-full h-32 object-cover rounded border bg-gray-100"
                    >
                  </div>
                </div>

                <!-- 结果信息 -->
                <div class="mt-4 flex justify-between items-center">
                  <div class="flex space-x-4 text-sm text-gray-500">
                    <span>类型: {{ getTypeLabel(result.type) }}</span>
                    <span>置信度: {{ (result.confidence * 100).toFixed(1) }}%</span>
                    <span>耗时: {{ result.processingTime }}ms</span>
                  </div>
                  
                  <div class="flex space-x-2">
                    <button
                      @click="downloadResult(result)"
                      class="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      下载
                    </button>
                    <button
                      @click="removeResult(result.id)"
                      class="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-else class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">暂无处理结果</h3>
              <p class="mt-1 text-sm text-gray-500">上传图片并开始处理后，结果将显示在这里</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMatting } from '@/composables/useMatting';
import { useFileUpload } from '@/composables/useFileUpload';
import { formatFileSize, downloadImage } from '@/utils/image';
import type { MattingType } from '@/types';

// 使用组合式函数
const { status, progress, error, results, processImage, clearResults, removeResult } = useMatting();
const { isDragover, selectedFiles, handleDragOver, handleDragLeave, handleDrop, handleFileInput, clearFiles } = useFileUpload();

// 选择的抠图类型
const selectedType = ref<MattingType>('auto');

// 开始处理
const startProcessing = async () => {
  if (selectedFiles.value.length === 0) return;

  try {
    // 处理第一个文件（简化版本，只处理一个文件）
    const file = selectedFiles.value[0];
    await processImage(file, selectedType.value);
    
    // 处理完成后清空选择的文件
    clearFiles();
  } catch (err) {
    console.error('处理失败:', err);
  }
};

// 下载结果
const downloadResult = (result: any) => {
  downloadImage(result.resultImage, `matting_${result.type}_${result.id}.png`);
};

// 获取类型标签
const getTypeLabel = (type: MattingType): string => {
  const labels: Record<MattingType, string> = {
    auto: '自动识别',
    portrait: '人像抠图',
    product: '商品抠图',
    graphic: '图形抠图'
  };
  return labels[type] || type;
};
</script>