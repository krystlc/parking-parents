<script setup lang="ts">
const props = defineProps<{ parkId: string }>();
const { isFavorite, toggleFavorite } = useFavorites();

const active = computed(() => isFavorite(props.parkId));
</script>

<template>
    <ClientOnly>
        <UButton
            :icon="active ? 'i-lucide-heart-minus' : 'i-lucide-heart-plus'"
            :color="active ? 'red' : 'gray'"
            variant="ghost"
            label="Save"
            :class="{ 'text-red-500': active }"
            @click.stop="toggleFavorite(parkId)"
        />
    </ClientOnly>
</template>
