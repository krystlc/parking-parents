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
        <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold flex items-center gap-2">
                <UIcon name="i-lucide-box" />
                Field Reports
            </h2>
            <UBadge v-if="reports" variant="subtle" color="info">
                {{ reports.length }}
                {{ reports.length === 1 ? "Update" : "Updates" }}
            </UBadge>
        </div>

        <div v-if="status === 'pending'" class="space-y-4">
            <USkeleton v-for="i in 2" :key="i" class="h-32 w-full rounded-xl" />
        </div>

        <div v-else-if="reports?.length" class="grid grid-cols-1 gap-4">
            <UpdateCard
                v-for="report in reports"
                :key="report.id"
                :post="report"
            />
        </div>

        <div
            v-else
            class="text-center p-10 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl"
        >
            <p class="text-muted">
                No field reports yet. Be the first to share an update!
            </p>
            <UButton disabled variant="ghost" class="mt-2"
                >Submit a correction</UButton
            >
        </div>
    </section>
</template>
