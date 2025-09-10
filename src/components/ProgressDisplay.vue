<template>
  <div class="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
      <svg class="animate-spin w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>处理进度</span>
    </h2>
    <div class="space-y-4">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">正在处理图片...</span>
        <span class="font-medium text-blue-600">{{ progress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          class="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out relative"
          :style="{ width: `${progress}%` }"
        >
          <div class="absolute inset-0 bg-white/30 animate-pulse"></div>
        </div>
      </div>
      <div class="text-xs text-gray-500 text-center">
        使用AI算法进行智能抠图处理
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress: number;
}

defineProps<Props>();
</script>
