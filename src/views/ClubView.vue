<script setup>
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
import { useMeetupStore } from '@/stores/meetupStore';
import MeetupList from '@/components/MeetupList.vue';

const activeTab = ref('searchClubs'); // 기본 탭은 '모임 검색'
const meetupStore = useMeetupStore();

const meetups = computed(() => meetupStore.meetups);

// 📌 필터 선택값 (반응형 데이터, 여러 개 선택 가능)
const selectedFilters = ref({
  rank: [],
  gender: [],
  age: [],
  handedness: []
});

// 📌 필터 옵션 목록
const filterOptions = {
  rank: ['S', 'A', 'B', 'C', 'D', 'E', 'F'],
  gender: ['남', '여'],
  age: ['20대 이하', '20대', '30대', '40대', '50대', '60대', '70대 이상'],
  handedness: ['오른손', '왼손']
};

// 📌 필터 선택/해제 함수 (중복 선택 가능)
const toggleFilter = (type, value) => {
  if (selectedFilters.value[type].includes(value)) {
    selectedFilters.value[type] = selectedFilters.value[type].filter(item => item !== value);
  } else {
    selectedFilters.value[type].push(value);
  }
};
</script>

<template>
  <div class="w-full max-w-4xl mx-auto mt-5">
    <!-- 📌 상단 탭 -->
    <div class="flex border-b">
      <button 
        @click="activeTab = 'myClubs'" 
        :class="activeTab === 'myClubs' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'"
        class="w-1/2 py-3 text-center font-semibold"
      >
        내 모임
      </button>
      <button 
        @click="activeTab = 'searchClubs'" 
        :class="activeTab === 'searchClubs' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'"
        class="w-1/2 py-3 text-center font-semibold"
      >
        모임 검색
      </button>
    </div>

    <!-- 📌 필터 영역 -->
    <div v-if="activeTab === 'searchClubs'" class="p-5 flex flex-col gap-4">

      <!-- 📌 필터 그룹 -->
      <div class="flex flex-col gap-3">
        
        <!-- 📌 급수 필터 -->
        <div class="flex items-center gap-3">
          <h3 class="font-bold w-24 text-right">급수</h3>
          <div class="flex flex-grow flex-wrap gap-2">
            <button 
              v-for="option in filterOptions.rank" 
              :key="option" 
              @click="toggleFilter('rank', option)"
              :class="selectedFilters.rank.includes(option) ? 'bg-blue-500 text-white' : 'bg-gray-100'"
              class="px-4 py-2 border rounded-md hover:bg-gray-300 flex-grow text-center"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <!-- 📌 성별 필터 -->
        <div class="flex items-center gap-3">
          <h3 class="font-bold w-24 text-right">성별</h3>
          <div class="flex flex-grow flex-wrap gap-2">
            <button 
              v-for="option in filterOptions.gender" 
              :key="option" 
              @click="toggleFilter('gender', option)"
              :class="selectedFilters.gender.includes(option) ? 'bg-blue-500 text-white' : 'bg-gray-100'"
              class="px-6 py-2 border rounded-md hover:bg-gray-300 flex-grow text-center"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <!-- 📌 나이 필터 -->
        <div class="flex items-center gap-3">
          <h3 class="font-bold w-24 text-right">나이</h3>
          <div class="flex flex-grow flex-wrap gap-2">
            <button 
              v-for="option in filterOptions.age" 
              :key="option" 
              @click="toggleFilter('age', option)"
              :class="selectedFilters.age.includes(option) ? 'bg-blue-500 text-white' : 'bg-gray-100'"
              class="px-4 py-2 border rounded-md hover:bg-gray-300 flex-grow text-center"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <!-- 📌 손잡이 필터 -->
        <div class="flex items-center gap-3">
          <h3 class="font-bold w-24 text-right">손잡이</h3>
          <div class="flex flex-grow flex-wrap gap-2">
            <button 
              v-for="option in filterOptions.handedness" 
              :key="option" 
              @click="toggleFilter('handedness', option)"
              :class="selectedFilters.handedness.includes(option) ? 'bg-blue-500 text-white' : 'bg-gray-100'"
              class="px-6 py-2 border rounded-md hover:bg-gray-300 flex-grow text-center"
            >
              {{ option }}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>


  <div class="w-full max-w-4xl mx-auto mt-5">
    <h2 class="text-2xl font-bold mb-4">클럽 목록</h2>

    <!-- 📌 필터 UI (추후 추가 가능) -->
    <div class="p-5 flex flex-col gap-4">
      <!-- 필터 UI를 여기에 추가 가능 -->
    </div>

    <!-- 📌 필터 아래에 모임 리스트 컴포넌트 추가 -->
    <MeetupList :meetups="meetups" />
  </div>


</template>

<style scoped>
/* 버튼 포커스 스타일 제거 */
button:focus {
  outline: none;
}
</style>
