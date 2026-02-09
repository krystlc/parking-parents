<template>
    <UContainer>
        <UCard variant="soft">
            <template #header>
                {{ park.title }}
            </template>

            {{ park.description }}

            <template #footer>
                <div class="space-x-2">
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
            </template>
        </UCard>
    </UContainer>
</template>

<script setup>
defineProps({
    park: Object,
});
</script>
