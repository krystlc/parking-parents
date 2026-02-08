<template>
    <div>
        <ULink :to="`/parks/${park.slug}`" variant="pill">{{
            park.title
        }}</ULink>
    </div>
</template>

<script setup>
defineProps({
    park: Object,
});
</script>
