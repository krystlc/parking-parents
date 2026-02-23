<template>
    <div class="mx-auto max-w-md">
        <div
            v-if="isSubscribed"
            class="text-center p-6 rounded-2xl border-2 animate-pulse"
        >
            <UIcon name="i-lucide-sparkles" class="w-8 h-8 mb-2" />
            <strong class="block text-xl font-bold">You're in the club!</strong>
            <p class="mt-1">
                Check your inbox for the latest field reports soon.
            </p>
        </div>

        <template v-else>
            <strong class="block text-center text-xl font-bold md:text-3xl">
                Want us to email you with the latest field reports?
            </strong>

            <form class="mt-6" @submit.prevent="handleSubscribe">
                <div class="relative max-w-lg">
                    <label class="sr-only" for="email"> Email </label>

                    <UInput
                        v-model="email"
                        id="email"
                        type="email"
                        required
                        placeholder="john@doe.com"
                        size="xl"
                        :disabled="status === 'pending'"
                        :ui="{ base: 'rounded-full' }"
                        class="w-full"
                    />

                    <UButton
                        type="submit"
                        :loading="status === 'pending'"
                        color="primary"
                        size="xl"
                        class="absolute end-1 top-1/2 -translate-y-1/2 rounded-full"
                    >
                        Subscribe
                    </UButton>
                </div>
                <p
                    v-if="errorMessage"
                    class="mt-2 text-center text-sm text-red-500 font-medium"
                >
                    {{ errorMessage }}
                </p>
            </form>
        </template>
    </div>
</template>

<script setup lang="ts">
const email = ref("");
const isSubscribed = ref(false);
const errorMessage = ref("");
const status = ref<"idle" | "pending">("idle");

const toast = useToast();

async function handleSubscribe() {
    if (!email.value) return;

    status.value = "pending";
    errorMessage.value = "";

    try {
        const { data, error } = await useFetch("/api/newsletter", {
            method: "POST",
            body: { email: email.value },
        });

        if (error.value) {
            throw new Error(
                error.value.statusMessage || "Something went wrong",
            );
        }

        if (data.value?.ok) {
            isSubscribed.value = true;
            toast.add({
                title: "Success!",
                description: data.value.message,
                icon: "i-lucide-check-circle",
                color: "primary",
            });
        } else {
            errorMessage.value = data.value?.message || "Unexpected error";
        }
    } catch (err: any) {
        errorMessage.value = err.message;
    } finally {
        status.value = "idle";
    }
}
</script>
