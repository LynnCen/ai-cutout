<template>
  <div
    class="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300"
  >
    <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <span>处理选项</span>
    </h2>

    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3"> 抠图类型 </label>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="option in mattingOptions"
            :key="option.value"
            @click="$emit('type-change', option.value)"
            :class="[
              'p-3 rounded-lg border-2 transition-all duration-200 text-left',
              selectedType === option.value
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50',
            ]"
          >
            <div class="flex items-center space-x-2">
              <div
                :class="[
                  'w-4 h-4 rounded-full border-2 transition-colors',
                  selectedType === option.value ? 'border-blue-500 bg-blue-500' : 'border-gray-300',
                ]"
              >
                <div
                  v-if="selectedType === option.value"
                  class="w-full h-full rounded-full bg-white scale-50"
                ></div>
              </div>
              <span class="text-sm font-medium">{{ option.label }}</span>
            </div>
            <p class="text-xs text-gray-500 mt-1 ml-6">{{ option.description }}</p>
          </button>
        </div>
      </div>

      <button
        @click="$emit('start-processing')"
        :disabled="isProcessing"
        class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
      >
        <span v-if="isProcessing" class="flex items-center justify-center space-x-2">
          <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>处理中...</span>
        </span>
        <span v-else class="flex items-center justify-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>开始抠图</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MattingType } from '@/types';

interface MattingOption {
  value: MattingType;
  label: string;
  description: string;
}

interface Props {
  selectedType: MattingType;
  isProcessing: boolean;
  mattingOptions: MattingOption[];
}

defineProps<Props>();

interface Emits {
  (e: 'type-change', type: MattingType): void;
  (e: 'start-processing'): void;
}

defineEmits<Emits>();
</script>
