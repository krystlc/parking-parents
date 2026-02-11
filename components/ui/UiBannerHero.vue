<template>
    <section class="lg:grid lg:place-content-center">
        <div class="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div class="mx-auto max-w-prose text-center">
                <h1 class="text-4xl font-bold sm:text-5xl">
                    <slot name="heading" />
                </h1>

                <p class="mt-4 text-base text-pretty sm:text-lg/relaxed">
                    <slot> </slot>
                </p>

                <div class="mt-4 flex justify-center gap-4 sm:mt-6">
                    <slot name="actions" />
                </div>
            </div>
        </div>
    </section>
</template>
