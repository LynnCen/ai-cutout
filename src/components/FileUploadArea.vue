<template>
  <div class="space-y-4">
    <div
      class="border-2 border-dashed rounded-lg p-8 text-center transition-colors"
      :class="isDragover 
        ? 'border-blue-400 bg-blue-50' 
        : 'border-gray-300 hover:border-gray-400'"
      @dragover="$emit('drag-over', $event)"
      @dragleave="$emit('drag-leave', $event)"
      @drop="$emit('drop', $event)"
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
            @change="$emit('file-input', $event)"
          >
        </label>
      </div>
      <p class="text-sm text-gray-500 mt-2">
        支持 JPG、PNG、WebP 格式，单个文件不超过 10MB
      </p>
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
</template>

<script setup lang="ts">
import { formatFileSize } from '@/utils/image';

interface Props {
  isDragover: boolean;
  selectedFiles: readonly File[];
}

defineProps<Props>();

interface Emits {
  (e: 'drag-over', event: DragEvent): void;
  (e: 'drag-leave', event: DragEvent): void;
  (e: 'drop', event: DragEvent): void;
  (e: 'file-input', event: Event): void;
}

defineEmits<Emits>();
</script>
