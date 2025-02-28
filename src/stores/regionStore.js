// stores/regionStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRegionStore = defineStore('region', () => {
  const myRegions = ref(['Gangdong-gu', 'Songpa-gu']);

  function updateRegions(newRegions) {
    myRegions.value = [...newRegions];
  }

  return { myRegions, updateRegions };
});