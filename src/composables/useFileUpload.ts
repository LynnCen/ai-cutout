import { ref, readonly } from 'vue';
import { isValidImageFile, isValidFileSize } from '@/utils/image';

export function useFileUpload() {
  const isDragover = ref(false);
  const selectedFiles = ref<File[]>([]);

  // 处理文件选择
  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];

    for (const file of fileArray) {
      if (!isValidImageFile(file)) {
        console.warn(`文件 ${file.name} 格式不支持`);
        continue;
      }

      if (!isValidFileSize(file)) {
        console.warn(`文件 ${file.name} 大小超过限制`);
        continue;
      }

      validFiles.push(file);
    }

    selectedFiles.value = validFiles;
    return validFiles;
  };

  // 拖拽事件处理
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    isDragover.value = true;
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    isDragover.value = false;
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    isDragover.value = false;

    if (e.dataTransfer?.files) {
      return handleFiles(e.dataTransfer.files);
    }
    return [];
  };

  // 文件输入处理
  const handleFileInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      return handleFiles(target.files);
    }
    return [];
  };

  // 清除选择的文件
  const clearFiles = () => {
    selectedFiles.value = [];
  };

  return {
    isDragover: readonly(isDragover),
    selectedFiles: readonly(selectedFiles),
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    clearFiles,
  };
}
