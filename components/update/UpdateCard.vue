<template>
    <UCard class="group transition-all shadow-sm hover:shadow-md">
        <div class="flex justify-between items-start mb-2">
            <span
                class="text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
                {{ $datefns.formatDistanceToNow(post.date) }}
            </span>
            <div class="flex gap-1">
                <UBadge
                    v-for="v in post.vibe?.slice(0, 2)"
                    :key="v"
                    variant="subtle"
                >
                    {{ v }}
                </UBadge>
            </div>
        </div>

        <h3 class="font-bold">
            {{ post.title }}
        </h3>

        <p class="text-sm text-muted mt-2 line-clamp-2">
            {{ post.description }}
        </p>

        <UButton
            :to="post.path"
            class="mt-4 flex items-center text-xs font-semibold"
            variant="link"
            icon="i-lucide-arrow-right"
            trailing
        >
            Read Full Report
        </UButton>
    </UCard>
</template>

<script setup lang="ts">
import type { UpdatesCollectionItem } from "@nuxt/content";

defineProps<{
    post: UpdatesCollectionItem;
}>();
</script>
