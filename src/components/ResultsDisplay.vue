<template>
  <div
    class="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300"
  >
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-gray-900 flex items-center space-x-2">
        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span>处理结果</span>
        <span
          class="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full"
        >
          {{ results.length }}
        </span>
      </h2>
      <button
        v-if="results.length > 0"
        @click="$emit('clear-all')"
        class="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center space-x-1"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span>清空全部</span>
      </button>
    </div>

    <!-- 结果列表 -->
    <ResultsList
      v-if="results.length > 0"
      :results="results"
      @download="$emit('download', $event)"
      @remove="$emit('remove', $event)"
    />

    <!-- 空状态 -->
    <EmptyState v-else />
  </div>
</template>

<script setup lang="ts">
import ResultsList from './ResultsList.vue';
import EmptyState from './EmptyState.vue';
import type { MattingResult } from '@/types';

interface Props {
  results: readonly MattingResult[];
}

defineProps<Props>();

interface Emits {
  (e: 'clear-all'): void;
  (e: 'download', result: MattingResult): void;
  (e: 'remove', id: string): void;
}

defineEmits<Emits>();
</script>
