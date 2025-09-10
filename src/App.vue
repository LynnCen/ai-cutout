<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- 头部 -->
    <header class="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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

    <!-- 主内容 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 左侧：上传和处理区域 -->
        <div class="space-y-6">
          <!-- 图片选择区域 -->
          <div class="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">选择图片</h2>
            
            <!-- 选择模式切换 -->
            <div class="mb-6">
              <div class="flex space-x-1 bg-gray-100/80 p-1 rounded-xl">
                <button
                  @click="imageMode = 'preset'"
                  :class="[
                    'flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200',
                    imageMode === 'preset' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  ]"
                >
                  <span class="flex items-center justify-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>预设图片</span>
                  </span>
                </button>
                <button
                  @click="imageMode = 'upload'"
                  :class="[
                    'flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200',
                    imageMode === 'upload' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  ]"
                >
                  <span class="flex items-center justify-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>上传图片</span>
                  </span>
                </button>
              </div>
            </div>

            <!-- 预设图片选择 -->
            <div v-if="imageMode === 'preset'" class="space-y-4">
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <div
                  v-for="image in presetImages"
                  :key="image.id"
                  @click="selectPresetImage(image)"
                  :class="[
                    'relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:scale-105',
                    selectedPresetImage?.id === image.id 
                      ? 'border-blue-500 ring-4 ring-blue-200/50 shadow-lg scale-105' 
                      : 'border-gray-200/50 hover:border-blue-300'
                  ]"
                >
                  <div class="relative">
                    <img
                      :src="image.url"
                      :alt="image.name"
                      class="w-full h-24 object-cover"
                    >
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                    
                    <!-- 选中状态指示器 -->
                    <div v-if="selectedPresetImage?.id === image.id" class="absolute top-2 right-2">
                      <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <!-- 类型标签 -->
                    <div class="absolute top-2 left-2">
                      <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
                        {{ getTypeLabel(image.type) }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="p-3 bg-gradient-to-r from-white to-gray-50">
                    <p class="text-sm font-medium text-gray-800 truncate">{{ image.name }}</p>
                  </div>
                </div>
              </div>
              
              <div v-if="selectedPresetImage" class="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-xl">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">已选择图片</p>
                    <p class="text-xs text-gray-600">{{ selectedPresetImage.name }} · {{ getTypeLabel(selectedPresetImage.type) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 文件上传区域 -->
            <div v-else class="space-y-4">
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
          </div>

          <!-- 处理选项 -->
          <div v-if="selectedFiles.length > 0 || selectedPresetImage" class="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
            <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>处理选项</span>
            </h2>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">
                  抠图类型
                </label>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    v-for="option in mattingOptions"
                    :key="option.value"
                    @click="selectedType = option.value"
                    :class="[
                      'p-3 rounded-lg border-2 transition-all duration-200 text-left',
                      selectedType === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                    ]"
                  >
                    <div class="flex items-center space-x-2">
                      <div :class="[
                        'w-4 h-4 rounded-full border-2 transition-colors',
                        selectedType === option.value
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      ]">
                        <div v-if="selectedType === option.value" class="w-full h-full rounded-full bg-white scale-50"></div>
                      </div>
                      <span class="text-sm font-medium">{{ option.label }}</span>
                    </div>
                    <p class="text-xs text-gray-500 mt-1 ml-6">{{ option.description }}</p>
                  </button>
                </div>
              </div>

              <button
                @click="startProcessing"
                :disabled="status === 'processing'"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
              >
                <span v-if="status === 'processing'" class="flex items-center justify-center space-x-2">
                  <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>处理中...</span>
                </span>
                <span v-else class="flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>开始抠图</span>
                </span>
              </button>
            </div>
          </div>

          <!-- 处理进度 -->
          <div v-if="status === 'processing'" class="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
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

          <!-- 错误提示 -->
          <div v-if="error" class="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-xl p-4 shadow-lg">
            <div class="flex">
              <div class="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">处理失败</h3>
                <p class="text-sm text-red-700 mt-1">{{ error }}</p>
                <button 
                  @click="error = null"
                  class="mt-2 text-xs text-red-600 hover:text-red-800 underline"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：结果展示区域 -->
        <div class="space-y-6">
          <div class="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>处理结果</span>
                <span class="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full">
                  {{ results.length }}
                </span>
              </h2>
              <button
                v-if="results.length > 0"
                @click="clearResults"
                class="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center space-x-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>清空全部</span>
              </button>
            </div>

            <!-- 结果列表 -->
            <div v-if="results.length > 0" class="space-y-6">
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
                      @click="downloadResult(result)"
                      class="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>下载</span>
                    </button>
                    <button
                      @click="removeResult(result.id)"
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

            <!-- 空状态 -->
            <div v-else class="text-center py-16">
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
const { status, progress, error, results, processImage, processPresetImage, clearResults, removeResult } = useMatting();
const { isDragover, selectedFiles, handleDragOver, handleDragLeave, handleDrop, handleFileInput, clearFiles } = useFileUpload();

// 选择的抠图类型
const selectedType = ref<MattingType>('auto');

// 图片选择模式
const imageMode = ref<'preset' | 'upload'>('preset');

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

// 选择预设图片
const selectPresetImage = (image: typeof presetImages.value[0]) => {
  selectedPresetImage.value = image;
  // 自动设置对应的抠图类型
  selectedType.value = image.type;
};

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

// 开始处理
const startProcessing = async () => {
  if (selectedFiles.value.length === 0 && !selectedPresetImage.value) return;

  try {
    if (selectedPresetImage.value) {
      // 处理预设图片
      await processPresetImage(selectedPresetImage.value, selectedType.value);
    } else {
      // 处理上传的文件
      const file = selectedFiles.value[0];
      await processImage(file, selectedType.value);
      clearFiles();
    }
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