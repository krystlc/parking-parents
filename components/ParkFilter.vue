<template>
    <UContainer class="py-8">
        <UCard>
            <template #header>
                <div class="flex flex-col gap-4">
                    <h2 class="text-2xl font-bold text-primary-600">
                        Find Your Perfect Park
                    </h2>
                    <UInput
                        v-model="filters.searchQuery"
                        icon="i-heroicons-magnifying-glass-20-solid"
                        size="xl"
                        :trailing="false"
                        placeholder="Search by park name or neighborhood..."
                    />
                </div>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="space-y-4">
                    <h3 class="font-semibold flex items-center gap-2">
                        <UIcon name="i-heroicons-shield-check" /> Safety &
                        Essentials
                    </h3>
                    <UCheckbox
                        v-model="filters.isFullyFenced"
                        label="Fully Fenced-In"
                        help="Must-have for 'runners'"
                    />
                    <UCheckbox
                        v-model="filters.hasShade"
                        label="Shaded Play Area"
                        help="Keeps slides cool"
                    />

                    <div class="pt-2">
                        <p class="text-sm font-medium mb-2">Amenities</p>
                        <USelectMenu
                            v-model="filters.essentials"
                            :options="essentialOptions"
                            multiple
                            placeholder="Select features"
                        />
                    </div>
                </div>

                <div class="space-y-4">
                    <h3 class="font-semibold flex items-center gap-2">
                        <UIcon name="i-heroicons-map" /> Terrain & Access
                    </h3>
                    <URadioGroup
                        v-model="filters.terrain"
                        legend="Surface Type"
                        :options="terrainOptions"
                    />
                </div>

                <div class="space-y-4">
                    <h3 class="font-semibold flex items-center gap-2">
                        <UIcon name="i-heroicons-sparkles" /> Park Vibe
                    </h3>
                    <USelectMenu
                        v-model="filters.vibe"
                        :options="vibeOptions"
                        placeholder="What's the mood today?"
                    >
                        <!-- <template #label>
                            <span v-if="filters.vibe">{{
                                filters.vibe.label
                            }}</span>
                            <span v-else>Choose a vibe</span>
                        </template> -->
                    </USelectMenu>

                    <div
                        class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                        <p class="text-xs text-gray-500 italic">
                            <strong>Parent Tip:</strong> Check the "Social Hub"
                            vibe if you're looking for other parents to chat
                            with!
                        </p>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-between items-center">
                    <UButton
                        variant="ghost"
                        color="gray"
                        @click="
                            Object.assign(filters, {
                                searchQuery: '',
                                essentials: [],
                                terrain: [],
                                vibe: null,
                                isFullyFenced: false,
                                hasShade: false,
                            })
                        "
                    >
                        Clear All Filters
                    </UButton>
                    <UButton color="primary" icon="i-heroicons-map-pin">
                        View Results
                    </UButton>
                </div>
            </template>
        </UCard>
    </UContainer>
</template>

<script setup lang="ts">
// Define the structure for our filters
const filters = reactive({
    searchQuery: "",
    essentials: [],
    terrain: [],
    vibe: null,
    isFullyFenced: false,
    hasShade: false,
});

const essentialOptions = [
    { label: "Restrooms", value: "restrooms", icon: "i-heroicons-hand-raised" },
    {
        label: "Baby Swings",
        value: "baby_swings",
        icon: "i-heroicons-face-smile",
    },
    {
        label: "Changing Tables",
        value: "changing_tables",
        icon: "i-heroicons-beaker",
    },
    { label: "Water Station", value: "water", icon: "i-heroicons-variable" },
];

const terrainOptions = [
    { label: "Paved Paths (Stroller friendly)", value: "paved" },
    { label: "Rubber Flooring", value: "rubber" },
    { label: "Wood Chips", value: "chips" },
];

const vibeOptions = [
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

// Logic to emit filters to a parent component or store
const emit = defineEmits(["update:filters"]);
watch(
    filters,
    (newVal) => {
        emit("update:filters", newVal);
    },
    { deep: true },
);
</script>
