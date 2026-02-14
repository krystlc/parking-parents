<script setup lang="ts">
const props = defineProps<{
    links: { id: string; text: string; depth: number }[];
}>();

const activeId = ref<string>("");
let observer: IntersectionObserver | null = null;

onMounted(() => {
    // 1. Initialize the Observer
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                // If the heading is in the top 20% of the viewport, set it as active
                if (entry.isIntersecting) {
                    activeId.value = entry.target.id;
                }
            });
        },
        {
            rootMargin: "0% 0% -80% 0%", // Trigger when heading is near the top
            threshold: 1.0,
        },
    );

    // 2. Track all headings that exist in our TOC
    props.links.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) observer?.observe(el);
    });
});

onUnmounted(() => {
    observer?.disconnect();
});
</script>

<template>
    <nav class="space-y-1">
        <p class="text-xs font-bold uppercase tracking-widest mb-4">
            On this page
        </p>
        <ul class="space-y-2">
            <li
                v-for="link in links"
                :key="link.id"
                :class="[
                    link.depth === 3 ? 'ml-4' : '',
                    'transition-colors duration-200',
                ]"
            >
                <ULink
                    :href="`#${link.id}`"
                    :active="activeId === link.id"
                    exactHash
                    class="text-sm block py-1 border-l-2 pl-4"
                    :class="[
                        activeId === link.id
                            ? 'font-semibold'
                            : 'border-transparent ',
                    ]"
                >
                    {{ link.text }}
                </ULink>
            </li>
        </ul>
    </nav>
</template>
