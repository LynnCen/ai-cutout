<template>
  <header class="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1
            class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            智能抠图系统
          </h1>
        </div>
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>基于AI的专业图像抠图工具</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Header组件不需要任何props或逻辑
</script>
