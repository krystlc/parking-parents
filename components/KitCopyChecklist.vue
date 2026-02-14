<script setup lang="ts">
const props = defineProps<{
    selector: string; // The CSS selector for the content to copy
    title: string; // Title for the top of the notes list
}>();

const copied = ref(false);

const handleCopy = () => {
    const element = document.querySelector(props.selector);
    if (!element) return;

    // 1. Clean up the text: Find list items and add a "checkbox" character
    const listItems = Array.from(element.querySelectorAll("li"));
    const checklistText = listItems
        .map((li) => `[ ] ${li.innerText.trim()}`)
        .join("\n");

    const finalNote = `${props.title}\n-------------------\n${checklistText}\n\nShared from ParkScout`;

    // 2. Write to Clipboard
    navigator.clipboard.writeText(finalNote).then(() => {
        copied.value = true;
        setTimeout(() => (copied.value = false), 2000);
    });
};
</script>

<template>
    <UButton
        :icon="copied ? 'i-lucide-circle-check' : 'i-lucide-clipboard-check'"
        :color="copied ? 'green' : 'primary'"
        variant="soft"
        size="sm"
        @click="handleCopy"
    >
        {{ copied ? "Copied to Clipboard!" : "Copy to Notes" }}
    </UButton>
</template>
