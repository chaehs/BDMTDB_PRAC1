<script setup>
import { ref } from 'vue';

// 투두리스트 데이터
const todos = ref([
  '모임관리 페이지 구성',
  '지도에 모임필터',
  '로그인 기능',
  '지역 전체선택/해제 기능',
  'MEETUP 경고 해결',
]);

// 리스트 전체 표시 여부
const isListOpen = ref(false);

// 전체 접기/펴기 토글 함수
function toggleList() {
  isListOpen.value = !isListOpen.value;
}
</script>

<template>
  <!-- 클릭 시 리스트 열기/닫기 -->
  <div class="p-4 bg-gray-100 overflow-hidden cursor-pointer" @click="toggleList">
    <div class="flex items-center mb-4">
      <h1 class="text-xl font-bold">To-Do-List 250304</h1>
      <!-- 상태에 따라 화살표 변경 -->
      <span class="ml-2 text-lg">
        {{ isListOpen ? '⬆️' : '⬇️' }}
      </span>
    </div>
    <ul v-if="isListOpen" class="list-disc pl-5 space-y-2">
      <li v-for="(todo, index) in todos" :key="index">
        <span>{{ todo }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
