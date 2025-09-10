<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        v-for="image in images"
        :key="image.id"
        @click="$emit('select', image)"
        :class="[
          'relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:scale-105',
          selectedImage?.id === image.id
            ? 'border-blue-500 ring-4 ring-blue-200/50 shadow-lg scale-105'
            : 'border-gray-200/50 hover:border-blue-300',
        ]"
      >
        <div class="relative">
          <img :src="image.url" :alt="image.name" class="w-full h-24 object-cover" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"
          ></div>

          <!-- 选中状态指示器 -->
          <div v-if="selectedImage?.id === image.id" class="absolute top-2 right-2">
            <div
              class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <!-- 类型标签 -->
          <div class="absolute top-2 left-2">
            <span
              class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full"
            >
              {{ getTypeLabel(image.type) }}
            </span>
          </div>
        </div>

        <div class="p-3 bg-gradient-to-r from-white to-gray-50">
          <p class="text-sm font-medium text-gray-800 truncate">{{ image.name }}</p>
        </div>
      </div>
    </div>

    <div
      v-if="selectedImage"
      class="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-xl"
    >
      <div class="flex items-center space-x-3">
        <div
          class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
        >
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-800">已选择图片</p>
          <p class="text-xs text-gray-600">
            {{ selectedImage.name }} · {{ getTypeLabel(selectedImage.type) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MattingType } from '@/types';

interface PresetImage {
  id: string;
  url: string;
  name: string;
  type: MattingType;
}

interface Props {
  images: PresetImage[];
  selectedImage: PresetImage | null;
}

defineProps<Props>();

interface Emits {
  (e: 'select', image: PresetImage): void;
}

defineEmits<Emits>();

// 获取类型标签
const getTypeLabel = (type: MattingType): string => {
  const labels: Record<MattingType, string> = {
    auto: '自动识别',
    portrait: '人像抠图',
    product: '商品抠图',
    graphic: '图形抠图',
  };
  return labels[type] || type;
};
</script>
