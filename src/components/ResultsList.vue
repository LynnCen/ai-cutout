<template>
  <div class="space-y-6">
    <div
      v-for="result in results"
      :key="result.id"
      class="bg-gradient-to-r from-white to-gray-50/50 border border-gray-200/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 原图 -->
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h4 class="text-sm font-medium text-gray-900">原图</h4>
          </div>
          <div class="relative group">
            <img
              :src="result.originalImage"
              alt="原图"
              class="w-full h-40 object-cover rounded-lg border border-gray-200 shadow-sm"
            >
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg"></div>
          </div>
        </div>
        
        <!-- 结果图 -->
        <div class="space-y-3">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <h4 class="text-sm font-medium text-gray-900">抠图结果</h4>
          </div>
          <div class="relative group">
            <img
              :src="result.resultImage"
              alt="抠图结果"
              class="w-full h-40 object-cover rounded-lg border border-gray-200 shadow-sm bg-gradient-to-br from-gray-100 to-gray-200"
            >
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg"></div>
          </div>
        </div>
      </div>

      <!-- 结果信息 -->
      <div class="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div class="flex flex-wrap gap-4 text-sm">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span class="text-gray-600">{{ getTypeLabel(result.type) }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-gray-600">置信度 {{ (result.confidence * 100).toFixed(1) }}%</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-gray-600">{{ result.processingTime }}ms</span>
          </div>
        </div>
        
        <div class="flex space-x-3">
          <button
            @click="$emit('download', result)"
            class="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>下载</span>
          </button>
          <button
            @click="$emit('remove', result.id)"
            class="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>删除</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MattingResult, MattingType } from '@/types';

interface Props {
  results: readonly MattingResult[];
}

defineProps<Props>();

interface Emits {
  (e: 'download', result: MattingResult): void;
  (e: 'remove', id: string): void;
}

defineEmits<Emits>();

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
