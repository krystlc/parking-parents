<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const route = useRoute();
const items = computed(() =>
    route.path
        .split("/")
        .filter((p) => p !== "")
        .map((path, index, array) => {
            const label = path
                .split("-")
                .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
                .join(" ");
            return {
                label,
                to: "/" + array.slice(0, index + 1).join("/"),
            } satisfies BreadcrumbItem;
        }),
);

useHead({
    script: [
        {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: items.value.map((crumb, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: crumb.label,
                    item: `https://parkingparents.com${crumb.to}`,
                })),
            }),
        },
    ],
});
</script>

<template>
    <UBreadcrumb :items="items" />
</template>
