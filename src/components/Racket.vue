<script setup>
import { ref } from 'vue'

defineProps({
    brand: String,
    model: String,
    weight: String,
    balance: String,
    stiffness: String,
    price: {
        type: String,
        default: '~',
    },
    color: Array,
})


const isLarge = ref(false)

const toggleSize = () => {
    isLarge.value = !isLarge.value;
}

</script>

<template>
    <!-- 정렬1 -->
    <!-- <button class="w-40 h-40 bg-blue-200 border-4 border-blue-500 flex flex-col items-center justify-center rounded-xl text-center font-bold text-xl">
        <h1>{{ brand }}</h1>
        <h1>{{ model }}</h1>
        <h1>{{ weight }}</h1>
        <h1>{{ balance }}</h1>
        <h1>{{ stiffness }}</h1>
    </button> -->





    <!-- 정렬2 -->
    <div class="p-1 w-full bg-blue-200 font-bold text-xl" @click="toggleSize">
        <div class="flex w-full">
            <div class="flex-[4] text-center border">{{ brand }}</div>
            <div class="flex-[12] text-center border">{{ model }}</div>
            <div class="flex-[3] text-center border">{{ weight }}</div>
            <div class="flex-[4] text-center border">{{ balance }}</div>
            <div class="flex-[4] text-center border">{{ stiffness }}</div>
            <div class="flex-[4] text-center border">{{ price }}</div>
        </div>
    </div>
    <div class="mb-3 p-1 w-full bg-white font-bold text-xl transition-all duration-300 ease-in-out simple-view"
        :class="{ 'large': isLarge }">
        상세정보
        <div class="">{{ color }}</div>
    </div>


</template>





<style scoped>
.simple-view {
    height: 0;
    padding: 0;
    opacity: 0;
    overflow: hidden; /* 높이가 0일 때 내용 숨김 */
}

.large {
    height: 8rem;
    opacity: 1;
}
</style>
