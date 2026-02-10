<template>
    <div>
        <header>
            <UContainer class="w-fit py-4">
                <Header />
            </UContainer>
        </header>
        <slot />
        <UContainer
            as="footer"
            class="text-center py-24 text-muted text-sm leading-relaxed"
        >
            <Footer />
        </UContainer>
    </div>
</template>
