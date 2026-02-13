<template>
    <UCard
        class="group transition-all shadow-sm hover:shadow-md"
        variant="subtle"
    >
        <header class="flex justify-between">
            {{ park.title }}

            <div>
                <slot />
            </div>
        </header>

        <div class="mt-4 flex flex-wrap gap-1">
            <UBadge
                icon="i-lucide-train-track"
                color="info"
                variant="soft"
                class="capitalize"
                >{{ park.terrain }}</UBadge
            >
            <UBadge
                v-if="park.restrooms"
                icon="i-lucide-toilet"
                color="info"
                variant="soft"
            >
                Restrooms
            </UBadge>
            <UBadge
                v-if="!park.shade"
                icon="i-lucide-sun"
                color="warning"
                variant="soft"
                >No shade</UBadge
            >
        </div>
    </UCard>
</template>

<script setup lang="ts">
import type { ParksCollectionItem } from "@nuxt/content";

defineProps<{
    park: ParksCollectionItem;
}>();
</script>
