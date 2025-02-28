<script setup>
import SeoulMap from '../components/SeoulMap.vue';
import { ref, onMounted, computed, watch } from 'vue';
import VueApexCharts from "vue3-apexcharts";
import membersData from '@/assets/members_temp';
import { useRegionStore } from '@/stores/regionStore';
import { storeToRefs } from 'pinia';

const regionStore = useRegionStore();
const { myRegions } = storeToRefs(regionStore);

const selectedRegionsEng = ref([]);




const membersInSelectedRegions = ref([]);
const districtExposure = ref(false);



onMounted(() => {
  if (myRegions.value.length > 0) {
    selectedRegionsEng.value = [...myRegions.value];
    getMembersData(selectedRegionsEng.value);
  }
});



const chartSkillGrade = ref([]);
const chartGender = ref([]);
const chartBirth = ref([]);
const chartHandedness = ref([]);

const skillLabels = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
const genderLabels = ['M', 'F'];
const ageLabels = ['10~', '20~', '30~', '40~', '50~', '60~', '70~'];
const handednessLabels = ['R', 'L'];

const activeFilters = ref({
    skill: [],
    gender: [],
    age: [],
    handedness: [],
});

const isFilterChanged = ref(false);

// 적용 버튼의 활성화 여부 (필터 or 지역 변경 감지)
const isFilterActive = computed(() => {
    return isFilterChanged.value;
});

// "적 용" 버튼을 눌렀을 때 실행되는 함수
function applyFilters() {
    isFilterChanged.value = false; // 버튼 색상 초기화
}

// ✅ 지역 변경 감지 (배열 길이 변화 감지)
watch(() => selectedRegionsEng.value.length, (newLength, oldLength) => {
    if (newLength !== oldLength) {
        isFilterChanged.value = true;
    }
});

// ✅ 필터 전체 상태가 변경될 때도 적용 버튼 활성화 (필터를 추가/삭제했을 때)
watch(activeFilters, (newFilters, oldFilters) => {
    if (JSON.stringify(newFilters) !== JSON.stringify(oldFilters)) {
        isFilterChanged.value = true;
    }
}, { deep: true }); // deep 옵션 추가하여 객체 내부 값 변경도 감지




// 차트 인스턴스 관리
const chartRefs = ref([]);

function getAllCounts(members) {
    const result = {
        skill: { S: 0, A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 },
        gender: { M: 0, F: 0 },
        birth: { '10~': 0, '20~': 0, '30~': 0, '40~': 0, '50~': 0, '60~': 0, '70~': 0 },
        handedness: { R: 0, L: 0 },
    };

    for (const mem of members) {
        if (mem.skill_grade && result.skill[mem.skill_grade] !== undefined) {
            result.skill[mem.skill_grade]++;
        }
        if (mem.sex && result.gender[mem.sex] !== undefined) {
            result.gender[mem.sex]++;
        }
        const ageGroup = getAgeGroup(mem.birth);
        if (result.birth[ageGroup] !== undefined) {
            result.birth[ageGroup]++;
        }
        if (mem.handedness && result.handedness[mem.handedness] !== undefined) {
            result.handedness[mem.handedness]++;
        }
    }
    return result;
}

function getAgeGroup(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 20) return '10~';
    if (age < 30) return '20~';
    if (age < 40) return '30~';
    if (age < 50) return '40~';
    if (age < 60) return '50~';
    if (age < 70) return '60~';
    return '70~';
}

function getMembersData(regions) {
    const data = membersData.filter((mem) => regions.includes(mem['district0']));
    membersInSelectedRegions.value = data;
    updateChart();
}

function updateChart() {
    const allCounts = getAllCounts(membersInSelectedRegions.value);
    chartSkillGrade.value = skillLabels.map(label => allCounts.skill[label]);
    chartGender.value = genderLabels.map(label => allCounts.gender[label]);
    chartBirth.value = ageLabels.map(label => allCounts.birth[label]);
    chartHandedness.value = handednessLabels.map(label => allCounts.handedness[label]);
}

function receivedDataFromSeoulMap(selectedRegions) {
    selectedRegionsEng.value = selectedRegions;
    console.log('selectedRegionsEng.value.length:', selectedRegionsEng.value.length)
    getMembersData(selectedRegions);
    regionStore.updateRegions(selectedRegions); // 스토어 업데이트
}


function showDistrict() {
    districtExposure.value = !districtExposure.value;
}

function handleBarClick(category, type) {
    if (activeFilters.value[type].includes(category)) {
        activeFilters.value[type] = activeFilters.value[type].filter(item => item !== category);
    } else {
        activeFilters.value[type].push(category);
    }
    isFilterChanged.value = true; // 필터가 변경되었음을 표시
    console.log(activeFilters.value[type]);
}

// 필터 초기화 함수 (활성화된 바도 초기화)
function resetFilters() {
    // 필터 초기화
    activeFilters.value = {
        skill: [],
        gender: [],
        age: [],
        handedness: [],
    };
    console.log('필터 초기화됨:', activeFilters.value);

    // 모든 차트의 활성화된 바 초기화
    if (chartRefs.value) {
        chartRefs.value.forEach(chart => {
            if (chart && chart.chart) {
                const series = chart.chart.w.config.series;
                // 선택된 데이터 포인트를 모두 빈 배열로 초기화
                chart.chart.w.globals.selectedDataPoints = series.map(() => []);
                chart.chart.update(); // 차트 새로고침
            }
        });
    }
}

function getChartOptions(labels, type) {
    // 차트별 색상 정의
    const chartColors = {
        skill: ['#FF6B6B'], // 급수별
        gender: ['#4ECDC4'], // 성별
        age: ['#45B7D1'], // 연령별
        handedness: ['#9B59B6'], // 손잡이
    };
    return {
        chart: {
            type: 'bar',
            events: {
                dataPointSelection: function (event, chartContext, config) {
                    handleBarClick(config.w.config.xaxis.categories[config.dataPointIndex], type);
                }
            }
        },
        xaxis: { categories: labels },
        title: { text: type.toUpperCase() },
        dataLabels: { enabled: false },
        tooltip: { marker: { show: false } },
        plotOptions: { bar: { distributed: true } },
        colors: chartColors[type], // 차트별 색상 배열 적용
        states: {
            normal: {
                filter: { type: 'none', value: 0 }
            },
            hover: {
                filter: { type: 'lighten', value: 0.1 }
            },
            active: {
                allowMultipleDataPointsSelection: true,
                filter: { type: 'darken', value: 0.5 }
            }
        },
        legend: { show: false }
    };
}
</script>

<template>
    <div>
        <div class="flex items-center">
            <button
                class="m-1 p-2 border border-blue-300 bg-white rounded-md shadow-sm text-gray-700 hover:bg-blue-50 font-medium"
                @click="showDistrict">
                지역명보기
            </button>
        </div>

        <SeoulMap 
            ref="sm" 
            @data-from-SeoulMap="receivedDataFromSeoulMap" 
            :districtExposure="districtExposure" 
            :initialRegions="myRegions" 
        />


        <!-- 선택된 필터 표시 영역 -->
        <div class="mt-5 p-2 bg-gray-100 rounded-md shadow min-h-[50px] max-h-[80px] overflow-y-auto flex items-center">
            <h3 class="text-lg font-semibold whitespace-nowrap mr-2">✅ 민턴인 데이터</h3>

            <div class="flex flex-wrap gap-1 flex-grow">
                <template v-if="Object.values(activeFilters).some(filter => filter.length)">
                    <span v-if="activeFilters.skill.length"
                        class="px-2 py-1 bg-skill-bg text-skill-text rounded-md text-sm">
                        급수: {{ activeFilters.skill.join(', ') }}
                    </span>
                    <span v-if="activeFilters.gender.length"
                        class="px-2 py-1 bg-gender-bg text-gender-text rounded-md text-sm">
                        성별: {{ activeFilters.gender.join(', ') }}
                    </span>
                    <span v-if="activeFilters.age.length" class="px-2 py-1 bg-age-bg text-age-text rounded-md text-sm">
                        연령: {{ activeFilters.age.join(', ') }}
                    </span>
                    <span v-if="activeFilters.handedness.length"
                        class="px-2 py-1 bg-handedness-bg text-handedness-text rounded-md text-sm">
                        손잡이: {{ activeFilters.handedness.join(', ') }}
                    </span>
                </template>
                <p v-else class="text-gray-500 text-sm flex-grow text-center">
                    지역을 선택하고 아래 차트의 바를 클릭하여 필터를 추가하세요.
                </p>
            </div>

            <button @click="resetFilters"
                class="ml-auto mx-2 p-1 border border-gray-400 rounded text-sm text-gray-700 hover:bg-gray-200 whitespace-nowrap min-w-[60px] min-h-[32px]">
                필터 초기화
            </button>
            <button @click="applyFilters"
                class="mx-2 p-1 border border-gray-400 rounded text-sm text-gray-700 whitespace-nowrap min-w-[60px] min-h-[32px]"
                :class="isFilterActive ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border-gray-400 text-gray-700 hover:bg-gray-200'">
                적 용
            </button>



        </div>





        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            <div v-for="(labels, index) in [skillLabels, genderLabels, ageLabels, handednessLabels]" :key="index"
                class="border-2 border-blue-500 rounded-lg p-4">
                <VueApexCharts ref="chartRefs" width="100%" height="300" type="bar"
                    :options="getChartOptions(labels, ['skill', 'gender', 'age', 'handedness'][index])"
                    :series="[{ name: ['급수별', '성별', '연령별', '손잡이'][index], data: [chartSkillGrade, chartGender, chartBirth, chartHandedness][index] }]" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
