<template>
    <header>
        <nav
            class="fixed top-4 w-fit inset-x-0 flex z-500 bg-amber-100 rounded-full mx-auto"
        >
            <NuxtLink
                v-for="link of links"
                :to="link.path"
                class="inline-flex items-center gap-1 py-2 px-4"
                ><UIcon :name="link.icon" /> {{ link.label }}</NuxtLink
            >
        </nav>
    </header>
</template>

<script setup>
const links = [
    {
        label: "Home",
        icon: "i-lucide-home",
        path: "/",
    },
    {
        label: "Blog",
        icon: "i-lucide-trees",
        path: "/blog",
    },
    {
        label: "Parks",
        icon: "i-lucide-map",
        path: "/parks",
    },
    {
        label: "the Kit",
        icon: "i-lucide-backpack",
        path: "/kit",
    },
    {
        label: "About",
        icon: "i-lucide-newspaper",
        path: "/about",
    },
];
</script>
