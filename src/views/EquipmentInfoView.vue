<script setup>
import { ref, onMounted, watch } from 'vue'
import Racket from '../components/Racket.vue'

// import { useSupabaseStore } from '../stores/supabase.js'
import { supabase } from '../lib/supabaseClient.js'
import racketsData from '@/assets/rackets_temp';
import RacketCard from '@/components/RacketCard.vue';

const rackets2 = ref(racketsData); // 임시데이터용
const rackets = ref([]) // 수파베이스용
const racketTags = ref([]) // 수파베이스용
const racketsTagsRel = ref([]) // 수파베이스용




// 수파베이스
async function getRacketsData() {
  const { data } = await supabase.from('rackets').select('*')
  rackets.value = data
  console.log(data)
  // console.log(rackets.value)
}

// 수파베이스
async function getRacketTagsData() {
  const { data } = await supabase.from('racket_tags').select('*')
  racketTags.value = data
  console.log(data)
  // console.log(rackets.value)
}

// 수파베이스
async function getRacketsTagsRelData() {
  const { data } = await supabase.from('rackets-tags').select('*')
  racketsTagsRel.value = data
  console.log(data)
  // console.log(rackets.value)
}




// 수파베이스 로딩
onMounted(() => {
  //   getRacketsData()
  // getRacketTagsData()
  // getRacketsTagsRelData()
})

// onMounted(async () => {
//   await getRacketsData()
//   console.log('Fetched Rackets Data:', rackets.value)
// })

</script>




<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
    <RacketCard v-for="(racket, index) in rackets2" :key="index" :racket="racket" :index="index" />
  </div>
</template>

<style scoped></style>

