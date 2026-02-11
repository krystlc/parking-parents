<template>
    <article class="rounded bg-elevated px-4 pt-12 pb-4">
        <time datetime="2022-10-10" class="block text-xs">
            Updated {{ $datefns.format(park.updated, "MMM dd, yyyy") }}
        </time>

        <a href="#">
            <h3 class="mt-0.5 text-lg font-medium">
                {{ park.title }}
            </h3>
        </a>

        <div class="mt-4 flex flex-wrap gap-1">
            <UBadge
                icon="i-lucide-panel-left-right-dashed"
                color="info"
                variant="soft"
                class="capitalize"
                >{{ park.terrain }}</UBadge
            >
            <UBadge icon="i-lucide-toilet" color="info" variant="soft">
                Restrooms
            </UBadge>
            <UBadge
                icon="i-lucide-thermometer-sun"
                color="warning"
                variant="soft"
                >No shade</UBadge
            >
        </div>
    </article>
</template>

<script setup lang="ts">
defineProps<{
    park: {
        title: string;
        description: string;
        path: string;
        terrain: boolean;
        updated: string;
    };
}>();
</script>
