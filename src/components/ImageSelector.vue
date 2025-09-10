<template>
  <div
    class="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300"
  >
    <h2 class="text-lg font-semibold text-gray-900 mb-4">选择图片</h2>

    <!-- 选择模式切换 -->
    <div class="mb-6">
      <div class="flex space-x-1 bg-gray-100/80 p-1 rounded-xl">
        <button
          :class="[
            'flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200',
            imageMode === 'preset'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105'
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/50',
          ]"
          @click="imageMode = 'preset'"
        >
          <span class="flex items-center justify-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span>预设图片</span>
          </span>
        </button>
        <button
          :class="[
            'flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200',
            imageMode === 'upload'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105'
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/50',
          ]"
          @click="imageMode = 'upload'"
        >
          <span class="flex items-center justify-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span>上传图片</span>
          </span>
        </button>
      </div>
    </div>

    <!-- 预设图片选择 -->
    <PresetImageGrid
      v-if="imageMode === 'preset'"
      :images="presetImages"
      :selected-image="selectedPresetImage"
      @select="handlePresetImageSelect"
    />

    <!-- 文件上传区域 -->
    <FileUploadArea
      v-else
      :is-dragover="isDragover"
      :selected-files="selectedFiles"
      @drag-over="handleDragOver"
      @drag-leave="handleDragLeave"
      @drop="handleDrop"
      @file-input="handleFileInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PresetImageGrid from './PresetImageGrid.vue';
import FileUploadArea from './FileUploadArea.vue';
import type { MattingType } from '@/types';

// Props
interface PresetImage {
  id: string;
  url: string;
  name: string;
  type: MattingType;
}

interface Props {
  presetImages: PresetImage[];
  selectedPresetImage: PresetImage | null;
  isDragover: boolean;
  selectedFiles: readonly File[];
}

defineProps<Props>();

// Emits
interface Emits {
  (e: 'preset-select', image: PresetImage): void;
  (e: 'drag-over', event: DragEvent): void;
  (e: 'drag-leave', event: DragEvent): void;
  (e: 'drop', event: DragEvent): void;
  (e: 'file-input', event: Event): void;
}

const emit = defineEmits<Emits>();

// 图片选择模式
const imageMode = ref<'preset' | 'upload'>('preset');

// 事件处理
const handlePresetImageSelect = (image: PresetImage) => {
  emit('preset-select', image);
};

const handleDragOver = (event: DragEvent) => {
  emit('drag-over', event);
};

const handleDragLeave = (event: DragEvent) => {
  emit('drag-leave', event);
};

const handleDrop = (event: DragEvent) => {
  emit('drop', event);
};

const handleFileInput = (event: Event) => {
  emit('file-input', event);
};
</script>
