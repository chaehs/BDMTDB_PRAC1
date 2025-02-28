<script setup>
defineProps({
    name: String,
    startTime: String,
    endTime: String,
    place: String,
    gradeCond: Array,
    memberCap: String,
    guestCap: String,
    organizer: String,
})

</script>







<template>
    <div class="p-2 w-full bg-blue-200 font-bold text-xl my-2">
        <div class="flex w-full gap-4">
            <div>{{ name }}</div>
            <div>{{ startTime }}~{{ endTime }}</div>
            <div>{{ place }}</div>
            <div>{{ gradeCond[0] }}~{{ gradeCond[gradeCond.length-1] }}</div>
            <div>회원{{ memberCap }}<template v-if="guestCap"> / 게스트 {{ guestCap }}</template></div>
            <div>by {{ organizer }}</div>
        </div>
    </div>
</template>