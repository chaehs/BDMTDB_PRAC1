<script setup>
import { ref, onMounted } from 'vue';
import { seoulMapPath, regionsEnglishToKorean } from '../lib/seoulMapPath';

const props = defineProps({
    districtExposure: Boolean,
    initialRegions: Array,
});

const regions = ref(seoulMapPath);
const clickedRegionName = ref('서울');
const selectedRegionsEng = ref([]);
// const selectedRegionsKo = computed(() => {
//     return selectedRegionsEng.value.map(region => regionsEnglishToKorean[region]);
// });


const emit = defineEmits(['data-from-SeoulMap']);
const SeoulSvg = ref(null);
let scale = 1;


onMounted(() => {
    // 초기 지역 설정
    if (props.initialRegions.length > 0) {
    selectedRegionsEng.value = [...props.initialRegions];
  }
    // SVG 휠 이벤트 리스너 추가
    if (SeoulSvg.value) {
        SeoulSvg.value.addEventListener(
            'wheel',
            (event) => {
                event.preventDefault();
                scale += event.deltaY * -0.001;
                scale = Math.min(Math.max(0.7, scale), 1.3);
                SeoulSvg.value.style.transform = `scale(${scale})`;
            },
            { passive: false }
        );
    }
});


// 클릭 이벤트 핸들러
function handleRegionClick(regionName) {
    clickedRegionName.value = regionsEnglishToKorean[regionName];
    toggleRegion(regionName);
    console.log(`${regionName} ${clickedRegionName.value}`);
    emit('data-from-SeoulMap', selectedRegionsEng.value);
}

// 구역 클릭 시 선택/해제 토글
function toggleRegion(regionName) {
    const index = selectedRegionsEng.value.indexOf(regionName);
    if (index === -1) {
        selectedRegionsEng.value.push(regionName);
    } else {
        selectedRegionsEng.value.splice(index, 1);
    }
}

function isSelected(regionName) {
    return selectedRegionsEng.value.includes(regionName);
}

function resetZoom() {
    if (SeoulSvg.value) {
        SeoulSvg.value.style.transform = `scale(1)`;
    }
}

defineExpose({
    resetZoom
});
</script>

<template>
    <div class="map-container flex justify-center items-center border-2 border-blue-500 rounded-xl">
        <svg ref="SeoulSvg" class="seoul-map" viewBox="-300 0 2000 1400">
            <text v-if="districtExposure" x="840" y="260" font-size="30" fill="black">도봉구</text>
            <text v-if="districtExposure" x="990" y="420" font-size="30" fill="black">노원구</text>
            <text v-if="districtExposure" x="780" y="400" font-size="30" fill="black">강북구</text>
            <text v-if="districtExposure" x="780" y="570" font-size="30" fill="black">성북구</text>
            <text v-if="districtExposure" x="670" y="650" font-size="30" fill="black">종로구</text>
            <text v-if="districtExposure" x="510" y="650" font-size="30" fill="black">서대문구</text>
            <text v-if="districtExposure" x="530" y="410" font-size="30" fill="black">은평구</text>
            <text v-if="districtExposure" x="1030" y="580" font-size="30" fill="black">중랑구</text>
            <text v-if="districtExposure" x="890" y="660" font-size="30" fill="black">동대문구</text>
            <text v-if="districtExposure" x="500" y="780" font-size="30" fill="black">마포구</text>
            <text v-if="districtExposure" x="720" y="745" font-size="30" fill="black">중구</text>
            <text v-if="districtExposure" x="860" y="790" font-size="30" fill="black">성동구</text>
            <text v-if="districtExposure" x="1010" y="810" font-size="30" fill="black">광진구</text>
            <text v-if="districtExposure" x="670" y="850" font-size="30" fill="black">용산구</text>
            <text v-if="districtExposure" x="150" y="730" font-size="30" fill="black">강서구</text>
            <text v-if="districtExposure" x="250" y="910" font-size="30" fill="black">양천구</text>
            <text v-if="districtExposure" x="250" y="1010" font-size="30" fill="black">구로구</text>
            <text v-if="districtExposure" x="390" y="920" font-size="30" fill="black">영등포구</text>
            <text v-if="districtExposure" x="385" y="1120" font-size="30" fill="black">금천구</text>
            <text v-if="districtExposure" x="560" y="1000" font-size="30" fill="black">동작구</text>
            <text v-if="districtExposure" x="550" y="1150" font-size="30" fill="black">관악구</text>
            <text v-if="districtExposure" x="760" y="1110" font-size="30" fill="black">서초구</text>
            <text v-if="districtExposure" x="930" y="1060" font-size="30" fill="black">강남구</text>
            <text v-if="districtExposure" x="1060" y="980" font-size="30" fill="black">송파구</text>
            <text v-if="districtExposure" x="1200" y="790" font-size="30" fill="black">강동구<title>강동구</title></text>

            <path v-for="region in regions" :key="region.name" :d="region.path"
                :fill="isSelected(region.name) ? '#ff8c00' : region.fillColor"
                @click="() => { handleRegionClick(region.name) }" class="region half-opacity" />
        </svg>
    </div>
</template>

<style scoped>
svg {
    transform-origin: center;
    transition: transform 0.3s ease;
}

.seoul-map {
    width: 70%;
    height: auto;
}

.region {
    cursor: pointer;
    transition: fill 0.3s ease;
}

.region:hover {
    fill: #ff8c00;
}

.half-opacity {
    opacity: 0.5;
}
</style>