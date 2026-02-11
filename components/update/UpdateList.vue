<script setup lang="ts">
const props = defineProps<{
    parkId: string;
}>();

// Fetch all updates where the parkId matches the current park
const { data: reports, status } = await useAsyncData(
    `reports-for-${props.parkId}`,
    () => {
        return queryCollection("updates")
            .where("parkId", "=", props.parkId)
            .order("date", "DESC") // Show the freshest reports first
            .all();
    },
);
</script>

<template>
    <section>
        <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold flex items-center gap-2 mb-8">
                <UIcon name="i-lucide-box" class="text-primary" />
                Field Reports
            </h2>
            <UBadge v-if="reports" color="gray" variant="soft">
                {{ reports.length }}
                {{ reports.length === 1 ? "Update" : "Updates" }}
            </UBadge>
        </div>

        <div v-if="status === 'pending'" class="space-y-4">
            <USkeleton v-for="i in 2" :key="i" class="h-32 w-full rounded-xl" />
        </div>

        <div v-else-if="reports?.length" class="grid grid-cols-1 gap-4">
            <NuxtLink
                v-for="report in reports"
                :key="report.id"
                :to="report.path"
                class="group p-5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 hover:border-primary-500 transition-all shadow-sm hover:shadow-md"
            >
                <div class="flex justify-between items-start mb-2">
                    <span
                        class="text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        {{ $datefns.formatDistanceToNow(report.date) }}
                    </span>
                    <div class="flex gap-1">
                        <UBadge
                            v-for="v in report.vibe?.slice(0, 2)"
                            :key="v"
                            size="xs"
                            variant="subtle"
                        >
                            {{ v }}
                        </UBadge>
                    </div>
                </div>

                <h3 class="font-bold">
                    {{ report.title }}
                </h3>

                <p class="text-sm text-muted mt-2 line-clamp-2">
                    {{ report.description }}
                </p>

                <div class="mt-4 flex items-center text-xs font-semibold">
                    Read Full Report
                    <UIcon name="i-lucide-arrow-right" class="ml-1 w-4 h-4" />
                </div>
            </NuxtLink>
        </div>

        <div
            v-else
            class="text-center p-10 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl"
        >
            <p class="text-muted">
                No field reports yet. Be the first to share an update!
            </p>
            <UButton variant="link" class="mt-2">Submit a correction</UButton>
        </div>
    </section>
</template>
