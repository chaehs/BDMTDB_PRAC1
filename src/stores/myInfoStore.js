// stores/regionStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMyInfoStore = defineStore('info', () => {
  const myRegions = ref(['Gangdong-gu', 'Songpa-gu', 'Gwangjin-gu']);

  function updateRegions(newRegions) {
    myRegions.value = [...newRegions];
  }

  return { myRegions, updateRegions };
});