<script setup lang="ts">
const props = defineProps<{
    parkId: string;
}>();

// Fetch only the single most recent report to check the date
const { data: latestReport } = await useAsyncData(
    `latest-condition-${props.parkId}`,
    () => {
        return queryCollection("updates")
            .where("parkId", "=", props.parkId)
            .order("date", "DESC")
            .first();
    },
);

const isRecent = computed(() => {
    if (!latestReport.value?.date) return false;

    const reportDate = new Date(latestReport.value.date);
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    return reportDate >= sevenDaysAgo;
});
</script>

<template>
    <div v-if="latestReport && isRecent" class="mb-6">
        <UAlert
            icon="i-lucide-triangle-alert"
            variant="soft"
            color="info"
            title="Recent Field Update"
            :description="`A parent shared a fresh update for this park on ${latestReport.date}. It might contain important info about current conditions.`"
        >
            <template #footer>
                <UButton
                    :to="latestReport.path"
                    size="xs"
                    color="amber"
                    variant="ghost"
                    label="Read Update"
                    icon="i-lucide-arrow-right"
                    trailing
                />
            </template>
        </UAlert>
    </div>
</template>
