<template>
    <UCard>
        <template #header>
            <div class="flex flex-col gap-4">
                <h2
                    class="text-2xl font-bold flex justify-between items-center"
                >
                    Find Your Perfect Park

                    <UButton
                        color="gray"
                        variant="ghost"
                        icon="i-lucide-x"
                        @click="emit('on:close')"
                    />
                </h2>
                <UInput
                    v-model="filters.q"
                    icon="i-lucide-search"
                    :trailing="false"
                    placeholder="Search by park name or neighborhood..."
                />
            </div>
        </template>

        <div class="space-y-4">
            <div class="space-y-2">
                <h3 class="font-semibold flex items-center gap-2">
                    <UIcon name="i-lucide-shield-check" /> Safety & Essentials
                </h3>
                <UCheckbox
                    v-model="filters.f"
                    label="Fully Fenced-In"
                    help="Must-have for 'runners'"
                />
                <UCheckbox
                    v-model="filters.s"
                    label="Shaded Play Area"
                    help="Keeps slides cool"
                />
            </div>

            <div class="space-y-2">
                <h3 class="font-semibold flex items-center gap-2">
                    <UIcon name="i-lucide-accessibility" /> Terrain & Access
                </h3>
                <URadioGroup
                    v-model="filters.t"
                    legend="Surface Type"
                    :items="terrainOptions"
                />
            </div>
        </div>

        <template #footer>
            <div class="flex justify-between items-center">
                <UButton
                    type="button"
                    color="secondary"
                    variant="soft"
                    @click="handleClear"
                >
                    Clear All Filters
                </UButton>
                <UButton type="button" @click="emit('on:close')">
                    Apply
                </UButton>
            </div>
        </template>
    </UCard>
</template>

<script setup lang="ts">
import type { ParksCollectionItem } from "@nuxt/content";
import { DEFAULT_FILTERS, type ParkFilters } from "./park-filter.schema";
import type { TerrainType } from "~/content.config";

const filters = defineModel<ParkFilters>({
    required: true,
    default: DEFAULT_FILTERS,
});
// Logic to emit filters to a parent component or store
const emit = defineEmits(["on:close"]);

// Define the structure for our filters
const handleClear = () => {
    filters.value = {
        ...DEFAULT_FILTERS,
    };
};

const essentialOptions: {
    label: string;
    icon: string;
    value: keyof ParksCollectionItem;
}[] = [
    { label: "Restrooms", value: "restrooms", icon: "i-lucide-hand" },
    {
        label: "Baby Swings",
        value: "babySwings",
        icon: "i-lucide-smile",
    },
];

const terrainOptions: { label: string; value: TerrainType }[] = [
    { label: "Paved Paths (Stroller friendly)", value: "paved" },
    { label: "Rubber Flooring", value: "rubber" },
    { label: "Wood Chips", value: "woodchips" },
];

const vibeOptions: { label: string; description: string; value: string }[] = [
    {
        label: "Energy Burner",
        value: "energy",
        description: "Big structures, lots of running",
    },
    {
        label: "Nature Escape",
        value: "nature",
        description: "Quiet, trees, wildlife",
    },
    {
        label: "Social Hub",
        value: "social",
        description: "Busy, great for playdates",
    },
];
</script>
