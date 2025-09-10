<template>
  <div class="text-center py-16">
    <div class="relative">
      <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
        <svg class="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full animate-pulse"></div>
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">暂无处理结果</h3>
    <p class="text-gray-500 mb-6 max-w-sm mx-auto">选择预设图片或上传自己的图片，然后点击"开始抠图"按钮，处理结果将显示在这里</p>
    <div class="flex justify-center space-x-4 text-sm text-gray-400">
      <div class="flex items-center space-x-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>快速处理</span>
      </div>
      <div class="flex items-center space-x-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>高精度</span>
      </div>
      <div class="flex items-center space-x-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>一键下载</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// EmptyState组件不需要任何props或逻辑
</script>
