import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMeetupStore = defineStore('meetup', () => {
  // 📌 Supabase에서 가져온 것처럼 임시 데이터 저장
  const meetups = ref([
    { id: 1, name: '강남 배드민턴 모임', location: '강남구', members: [1, 2, 3] },
    { id: 2, name: '송파 배드민턴 클럽', location: '송파구', members: [1, 2, 3, 4, 5] },
    { id: 3, name: '광진구 배드민턴 동호회', location: '광진구', members: [1, 2] },
    { id: 4, name: '마포 배드민턴 팀', location: '마포구', members: [1, 2, 3, 4] },
  ]);

  // 📌 Supabase에서 데이터를 불러오는 것처럼 동작하는 함수
  const fetchMeetups = () => {
    console.log('🔥 모임 데이터를 가져옴:', meetups.value);
  };

  return {
    meetups,
    fetchMeetups,
  };
});
