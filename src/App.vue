<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- 头部 -->
    <AppHeader />

    <!-- 主内容 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 左侧：上传和处理区域 -->
        <div class="space-y-6">
          <!-- 图片选择区域 -->
          <ImageSelector
            :preset-images="presetImages"
            :selected-preset-image="selectedPresetImage"
            :is-dragover="isDragover"
            :selected-files="selectedFiles as readonly File[]"
            @preset-select="handlePresetImageSelect"
            @drag-over="handleDragOver"
            @drag-leave="handleDragLeave"
            @drop="handleDrop"
            @file-input="handleFileInput"
          />

          <!-- 处理选项 -->
          <ProcessingOptions
            v-if="selectedFiles.length > 0 || selectedPresetImage"
            :selected-type="selectedType"
            :is-processing="status === 'processing'"
            :matting-options="mattingOptions"
            @type-change="handleTypeChange"
            @start-processing="startProcessing"
          />

          <!-- 处理进度 -->
          <ProgressDisplay
            v-if="status === 'processing'"
            :progress="progress"
          />

          <!-- 错误提示 -->
          <ErrorDisplay
            v-if="error"
            :error="error"
            @close="handleErrorClose"
          />
        </div>

        <!-- 右侧：结果展示区域 -->
        <div class="space-y-6">
          <ResultsDisplay
            :results="results as readonly MattingResult[]"
            @clear-all="clearResults"
            @download="downloadResult"
            @remove="removeResult"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import ImageSelector from '@/components/ImageSelector.vue';
import ProcessingOptions from '@/components/ProcessingOptions.vue';
import ProgressDisplay from '@/components/ProgressDisplay.vue';
import ErrorDisplay from '@/components/ErrorDisplay.vue';
import ResultsDisplay from '@/components/ResultsDisplay.vue';
import { useMatting } from '@/composables/useMatting';
import { useFileUpload } from '@/composables/useFileUpload';
import { downloadImage } from '@/utils/image';
import type { MattingType, MattingResult } from '@/types';

// 使用组合式函数
const { status, progress, error, results, processImage, processPresetImage, clearResults, removeResult, clearError } = useMatting();
const { isDragover, selectedFiles, handleDragOver, handleDragLeave, handleDrop, handleFileInput, clearFiles } = useFileUpload();

// 选择的抠图类型
const selectedType = ref<MattingType>('auto');

// 预设图片列表
const presetImages = ref([
  {
    id: 'portrait-1',
    url: 'https://insmind-gdesign-dam-fat-static.xsbapp.com/33665218580841555/8715d817ef2f44e4a0abdb094119692f.png?x-oss-process=image/resize,w_3000,h_3000,type_6/interlace,1',
    name: '人物肖像',
    type: 'portrait' as MattingType
  },
  {
    id: 'product-1',
    url: 'https://insmind-gdesign-dam-fat-static.xsbapp.com/33665218580841555/8715d817ef2f44e4a0abdb094119692f.png?x-oss-process=image/resize,w_3000,h_3000,type_6/interlace,1',
    name: '商品展示',
    type: 'product' as MattingType
  },
  {
    id: 'graphic-1',
    url: 'https://insmind-gdesign-dam-fat-static.xsbapp.com/33665218580841555/8715d817ef2f44e4a0abdb094119692f.png?x-oss-process=image/resize,w_3000,h_3000,type_6/interlace,1',
    name: '图形元素',
    type: 'graphic' as MattingType
  },
  {
    id: 'auto-1',
    url: 'https://insmind-gdesign-dam-fat-static.xsbapp.com/33665218580841555/8715d817ef2f44e4a0abdb094119692f.png?x-oss-process=image/resize,w_3000,h_3000,type_6/interlace,1',
    name: '动物照片',
    type: 'auto' as MattingType
  },
  {
    id: 'auto-2',
    url: 'https://insmind-gdesign-dam-fat-static.xsbapp.com/33665218580841555/8715d817ef2f44e4a0abdb094119692f.png?x-oss-process=image/resize,w_3000,h_3000,type_6/interlace,1',
    name: '风景照片',
    type: 'auto' as MattingType
  },
  {
    id: 'graphic-2',
    url: 'https://insmind-gdesign-dam-fat-static.xsbapp.com/33665218580841555/8715d817ef2f44e4a0abdb094119692f.png?x-oss-process=image/resize,w_3000,h_3000,type_6/interlace,1',
    name: 'Logo设计',
    type: 'graphic' as MattingType
  }
]);

// 选中的预设图片
const selectedPresetImage = ref<typeof presetImages.value[0] | null>(null);

// 抠图选项
const mattingOptions = ref([
  {
    value: 'auto' as MattingType,
    label: '自动识别',
    description: '智能识别图片类型并选择最佳算法'
  },
  {
    value: 'portrait' as MattingType,
    label: '人像抠图',
    description: '专门针对人物照片优化的抠图算法'
  },
  {
    value: 'product' as MattingType,
    label: '商品抠图',
    description: '适用于商品展示图的精确抠图'
  },
  {
    value: 'graphic' as MattingType,
    label: '图形抠图',
    description: '适用于图标、logo等图形元素'
  }
]);

// 事件处理函数
const handlePresetImageSelect = (image: typeof presetImages.value[0]) => {
  selectedPresetImage.value = image;
  selectedType.value = image.type;
};

const handleTypeChange = (type: MattingType) => {
  selectedType.value = type;
};

const handleErrorClose = () => {
  clearError();
};

const startProcessing = async () => {
  if (selectedFiles.value.length === 0 && !selectedPresetImage.value) return;

  try {
    if (selectedPresetImage.value) {
      await processPresetImage(selectedPresetImage.value, selectedType.value);
    } else {
      const file = selectedFiles.value[0];
      await processImage(file, selectedType.value);
      clearFiles();
    }
  } catch (err) {
    console.error('处理失败:', err);
  }
};

const downloadResult = (result: MattingResult) => {
  downloadImage(result.resultImage, `matting_${result.type}_${result.id}.png`);
};
</script>