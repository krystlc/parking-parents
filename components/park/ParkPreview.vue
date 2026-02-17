<template>
    <div class="p-4 flex flex-col h-full rounded-t-2xl">
        <div class="w-12 h-1.5 rounded-full mx-auto mb-4" />

        <div v-if="selectedPark" class="space-y-4">
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-xl font-bold">
                        {{ selectedPark.title }}
                    </h2>
                    <p class="text-sm">
                        {{ selectedPark.address.street }}
                    </p>
                </div>
                <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-lucide-x"
                    @click="emit('on:close')"
                />
            </div>

            <div class="flex gap-2">
                <UBadge v-if="selectedPark.fenced" variant="soft" color="green"
                    >Fenced</UBadge
                >
                <UBadge v-if="selectedPark.shade" variant="soft" color="orange"
                    >Shaded</UBadge
                >
                <UBadge variant="soft">{{ selectedPark.terrain }}</UBadge>
            </div>

            <p class="text-sm line-clamp-2">
                {{ selectedPark.description }}
            </p>

            <UButton
                :to="selectedPark.path"
                block
                size="lg"
                icon="i-lucide-arrow-right"
                trailing
            >
                View Full Details & Updates
            </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ParksCollectionItem } from "@nuxt/content";

defineProps<{ selectedPark: ParksCollectionItem }>();
const emit = defineEmits(["on:close"]);
</script>
