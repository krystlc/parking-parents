<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
    {
        label: "Home",
        icon: "i-lucide-home",
        to: "/",
    },
    {
        label: "Blog",
        icon: "i-lucide-trees",
        to: "/blog",
    },
    {
        label: "Parks",
        icon: "i-lucide-map",
        to: "/parks",
    },
    {
        label: "the Kit",
        icon: "i-lucide-backpack",
        to: "/kit",
    },
]);
</script>

<template>
    <UNavigationMenu
        :items="items"
        class="w-full justify-center py-4"
        color="info"
    />
</template>
