<template>
  <div class="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-xl p-4 shadow-lg">
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
          @click="$emit('close')"
          class="mt-2 text-xs text-red-600 hover:text-red-800 underline"
        >
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: string;
}

defineProps<Props>();

interface Emits {
  (e: 'close'): void;
}

defineEmits<Emits>();
</script>
