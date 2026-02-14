<template>
    <footer class="">
        <div class="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-md">
                <strong class="block text-center text-xl font-bold sm:text-3xl">
                    Want us to email you with the latest field reports?
                </strong>

                <form class="mt-6">
                    <div class="relative max-w-lg">
                        <label class="sr-only" for="email"> Email </label>

                        <UInput
                            class="w-full rounded-full p-4 pe-32 text-sm font-medium"
                            id="email"
                            type="email"
                            placeholder="john@doe.com"
                        />

                        <UButton
                            disabled
                            class="absolute end-1 top-1/2 -translate-y-1/2 rounded-full px-5 py-3 text-sm font-medium transition"
                        >
                            Subscribe
                        </UButton>
                    </div>
                </form>
            </div>

            <div class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
                <div class="mx-auto max-w-sm lg:max-w-none">
                    <p class="mt-4 text-center lg:text-left lg:text-lg">
                        Everything you need for a stress-free outing, from
                        newborn essentials to toddler 'emergency' kits.
                    </p>

                    <div
                        class="mt-6 flex justify-center gap-4 lg:justify-start"
                    >
                        <ULink
                            class="transition hover:/75"
                            href="https://github.com/krystlc/parking-parents"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span class="sr-only"> GitHub </span>

                            <svg
                                class="size-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </ULink>
                    </div>
                </div>

                <div
                    class="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left"
                >
                    <div>
                        <strong class="font-medium"> Navigation </strong>

                        <ul class="mt-6 space-y-1">
                            <li v-for="item of items" :key="item.to">
                                <ULink :to="item.to">
                                    {{ item.label }}
                                </ULink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="mt-16 border-t pt-8">
                <p class="text-center text-xs/relaxed">
                    © ParkingParents.com 2022. All rights reserved.

                    <br />

                    Made in Tampa, FL for
                    <UIcon
                        name="i-lucide-heart"
                        class="text-rose-500 size-4 -my-1"
                    />
                    everybody.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
const items = [
    {
        label: "Blog",
        to: "/blog",
    },
    {
        label: "Parks",
        to: "/parks",
    },
    {
        label: "the Kit",
        to: "/kit",
    },
];
</script>
