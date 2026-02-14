<template>
    <UCard>
        <template #header>
            <div class="flex flex-col gap-4">
                <h2 class="text-2xl font-bold">Find Your Perfect Park</h2>
                <UInput
                    v-model="filters.searchQuery"
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
                    v-model="filters.isFullyFenced"
                    label="Fully Fenced-In"
                    help="Must-have for 'runners'"
                />
                <UCheckbox
                    v-model="filters.hasShade"
                    label="Shaded Play Area"
                    help="Keeps slides cool"
                />

                <div class="space-y-2">
                    <p class="text-sm font-medium">Amenities</p>
                    <USelect
                        v-model="filters.essentials"
                        :items="essentialOptions"
                        multiple
                        placeholder="Select features"
                    />
                </div>
            </div>

            <div class="space-y-2">
                <h3 class="font-semibold flex items-center gap-2">
                    <UIcon name="i-lucide-accessibility" /> Terrain & Access
                </h3>
                <URadioGroup
                    v-model="filters.terrain"
                    legend="Surface Type"
                    :items="terrainOptions"
                />
            </div>

            <div class="space-y-2">
                <h3 class="font-semibold flex items-center gap-2">
                    <UIcon name="i-lucide-sparkles" /> Park Vibe
                </h3>
                <USelect
                    v-model="filters.vibe"
                    :items="vibeOptions"
                    placeholder="What's the mood today?"
                />

                <UAlert
                    title="Parent Tip:"
                    variant="soft"
                    description="Check the Social Hub vibe if you're looking for other parents to chat with!"
                >
                </UAlert>
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
            </div>
        </template>
    </UCard>
</template>

<script setup lang="ts">
// Define the structure for our filters
const filters = reactive({
    searchQuery: "",
    essentials: [],
    terrain: [],
    vibe: "",
    isFullyFenced: false,
    hasShade: false,
});

const essentialOptions = [
    { label: "Restrooms", value: "restrooms", icon: "i-lucide-hand" },
    {
        label: "Baby Swings",
        value: "baby_swings",
        icon: "i-lucide-smile",
    },
    {
        label: "Changing Tables",
        value: "changing_tables",
        icon: "i-lucide-beaker",
    },
    { label: "Water Station", value: "water", icon: "i-lucide-variable" },
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
