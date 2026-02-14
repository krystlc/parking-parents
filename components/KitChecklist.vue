<template>
    <div :id="selector">
        <slot />
    </div>
    <KitCopyChecklist :selector="'#' + selector" :title="title" />
</template>

<script setup lang="ts">
const props = defineProps<{
    selector: string; // The CSS selector for the content to copy
    title: string; // Title for the top of the notes list
}>();
</script>
