<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 📌 부모 컴포넌트에서 `props`로 모임 데이터를 받음
const props = defineProps({
  meetups: Array // 모임 리스트 (필터링된 데이터)
});

// 📌 모임 상세 페이지 이동 함수
const goToMeetup = (id) => {
  router.push(`/meetup/${id}`);
};
</script>

<template>
  <div class="mt-6">
    <h2 class="text-xl font-bold mb-4">모임 리스트</h2>

    <div v-if="meetups.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="meetup in meetups" 
        :key="meetup.id" 
        @click="goToMeetup(meetup.id)"
        class="p-4 border rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition"
      >
        <h3 class="text-lg font-semibold">{{ meetup.name }}</h3>
        <p class="text-sm text-gray-600">{{ meetup.location }}</p>
        <p class="text-sm text-gray-600">참여 인원: {{ meetup.members.length }}명</p>
      </div>
    </div>

    <p v-else class="text-gray-500">조건에 맞는 모임이 없습니다.</p>
  </div>
</template>

<style scoped>
/* 클릭 시 강조 효과 */
div:hover {
  transition: all 0.2s ease-in-out;
}
</style>
