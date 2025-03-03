<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { supabase } from './lib/supabaseClient'
import ToDoList from './components/ToDoList.vue';
import Meetup from './components/Meetup.vue'
import meetupsData from './assets/meetups_temp'
import { useMyInfoStore } from '@/stores/myInfoStore';
import { storeToRefs } from 'pinia';


const myInfoStore = useMyInfoStore();
const { myInfo } = storeToRefs(myInfoStore); // 반응형 참조



const countries = ref([])
const isPanelOpen = ref(false)
const meetups = ref(meetupsData)

async function getTableData() {
  const { data } = await supabase.from('page0').select('*')
  countries.value = data
}

async function getRacketData() {
  const { data } = await supabase.from('rackets').select('*')
  console.log(data)
}

async function getRacketTagData() {
  const { data } = await supabase.from('racket_tags').select('*')
  console.log(data)
}

async function getTagForRacketData() {
  const { data } = await supabase.from('rackets-tags').select('*')
  console.log(data)
}

onMounted(() => {
  // getTableData()
})

function togglePanel() {
  isPanelOpen.value = !isPanelOpen.value
}
</script>

<template>
  <ToDoList />
  <div class="flex h-screen flex-col">
    <!-- 상단 패널 -->
    <header class="w-full bg-gray-200 text-black p-1 flex justify-between items-center">
      <div class="text-2xl font-bold" style="flex-basis: 30%;">배드민턴 빅데이터</div>
      <div class="" style="flex-basis: 40%;">
        <nav class="flex-grow flex justify-center gap-10">
          <RouterLink to="/" class="text-xl font-bold p-3">HOME</RouterLink>
          <RouterLink to="/clubinfo" class="text-xl font-bold p-3">CLUB</RouterLink>
          <RouterLink to="/equipmentinfo" class="text-xl font-bold p-3">EQUIPMENT</RouterLink>
          <RouterLink to="/bagics" class="text-xl font-bold p-3">BASICS</RouterLink>
          <button class="text-xl font-bold p-3" @click="togglePanel">MEETUP</button>
        </nav>
      </div>
      <div class="flex justify-end items-center" style="flex-basis: 30%;">
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">로그인</button>
      </div>
    </header>

    <div class="flex flex-grow justify-center bg-gray-200 relative">
      <!-- 좌측 패널 (아바타, 장비, 쪽지함) -->
      <div class="pr-16 bg-blue-100" style="flex-basis: 25%;">
        <div class="flex flex-col gap-4 p-4 h-full bg-gray-300">
          <!-- 아바타 -->
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 bg-gray-500 rounded-full mb-2"></div>
            <span class="font-bold">닉네임</span>
          </div>

          <!-- 착용 장비 -->
          <div class="bg-white p-3 rounded-lg">
            <h3 class="font-bold mb-2">내 착용장비</h3>
            <ul class="text-sm">
              <li>라켓: Yonex Arcsaber</li>
              <li>신발: Victor P9200</li>
              <li>스트링: BG65</li>
            </ul>
          </div>

          <!-- 쪽지함 -->
          <div class="bg-white p-3 rounded-lg">
            <h3 class="font-bold mb-2">쪽지함</h3>
            <ul class="text-sm">
              <li class="mb-1">새 메시지 (2)</li>
              <li class="mb-1">받은 메시지 (15)</li>
              <li>보낸 메시지 (8)</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 중앙 콘텐츠 -->
      <div class="p-1 bg-blue-100" style="flex-basis: 50%;">
        <RouterView />
      </div>

      <!-- 우측 빈 공간 -->
      <div class="p-1 bg-blue-100" style="flex-basis: 25%;">우측공간</div>

      <!-- 우측 Meetup 패널 -->
      <transition name="slide">
        <div v-if="isPanelOpen"
          class="fixed right-0 top-0 w-full md:w-1/3 lg:w-1/4 h-full bg-gray-400 p-5 shadow-lg rounded-xl overflow-y-auto">
          <h2 class="text-xl font-bold mb-4">모임 현황</h2>
          <div class="flex gap-3">
            <button
              class="w-20 h-10 bg-blue-100 border-2 border-gray-500 rounded-lg flex items-center justify-center font-bold text-lg">
              급수별
            </button>
            <button
              class="w-20 h-10 bg-blue-100 border-2 border-gray-500 rounded-lg flex items-center justify-center font-bold text-lg">
              연령별
            </button>
            <button
              class="w-20 h-10 bg-blue-100 border-2 border-gray-500 rounded-lg flex items-center justify-center font-bold text-lg">
              성별
            </button>
          </div>
          <p>생성된 모임 리스트</p>
          <Meetup v-for="(meetup, index) in meetups" :key="index" v-bind="meetup" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* 애니메이션 효과 정의 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>