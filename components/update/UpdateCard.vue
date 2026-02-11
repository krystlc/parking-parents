<template>
    <article class="flex bg-elevated">
        <div class="rotate-180 p-2 [writing-mode:vertical-lr]">
            <time
                :datetime="post.date"
                class="flex items-center justify-between gap-4 text-xs font-bold uppercase"
            >
                <span>{{ $datefns.format(post.date, "yyyy") }}</span>
                <span class="w-px flex-1"></span>
                <span>{{ $datefns.format(post.date, "MMM d") }}</span>
            </time>
        </div>

        <div class="hidden sm:block sm:basis-56 bg-default/50"></div>

        <div
            class="flex flex-1 flex-col justify-between border-s border-muted sm:border-l-transparent"
        >
            <div class="p-4 sm:p-6">
                <ULink :to="post.path">
                    <h3 class="font-bold uppercase">
                        {{ post.title }}
                    </h3>
                </ULink>

                <p class="mt-2 line-clamp-3 text-sm/relaxed">
                    {{ post.preview }}
                </p>
            </div>

            <div class="flex items-end justify-end">
                <UButton :to="post.path" class="rounded-br-none">
                    Read Blog
                </UButton>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
defineProps<{
    post: {
        date: string;
        title: string;
        preview: string;
        path: string;
    };
}>();
</script>
