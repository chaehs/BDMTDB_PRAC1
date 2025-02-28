<script setup>
import { ref } from 'vue';

const DEFAULT_IMAGE = '/images/default-racket.png';

const props = defineProps({
  racket: Object,
});
</script>

<template>
  <div 
    class="bg-white p-4 shadow-lg rounded-xl border hover:shadow-2xl transition flex items-center"
  >
    <!-- 왼쪽: 라켓 기본 정보 -->
    <div class="flex-1 pr-4">
      <div class="flex items-center gap-2">
        <!-- 라켓명 -->
        <h2 class="text-lg font-bold">{{ racket.brand }} - {{ racket.model }}</h2>
        
        <!-- 색상 원 표시 -->
        <div class="flex items-center gap-1">
          <span 
            v-for="color in racket.color" 
            :key="color" 
            :style="{ backgroundColor: color }"
            class="w-4 h-4 rounded-full border"
          ></span>
        </div>
      </div>

      <div class="flex gap-2 mt-2">
        <span class="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded">무게: {{ racket.weight }}</span>
        <span class="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded">밸런스: {{ racket.balance }}</span>
        <span class="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded">강성: {{ racket.stiffness }}</span>
        <span class="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded">길이: {{ racket.length }}</span>
      </div>

      <!-- 상세 정보 -->
      <div class="mt-3 bg-gray-100 p-3 rounded-lg transition-all">
        <div class="flex items-center gap-2 mt-2">
          라켓별 태그

        </div>
      </div>
    </div>

    <!-- 오른쪽: 라켓 이미지 (하늘색 박스 포함) -->
    <div class="flex-none w-40 h-40 bg-blue-200 flex justify-center items-center rounded-lg shadow-md">
      <img 
        :src="racket.image || DEFAULT_IMAGE" 
        alt="Racket Image"
        class="w-32 h-32 object-contain"
      />
    </div>
  </div>
</template>

<style scoped>
/* 부드러운 fade 효과 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
