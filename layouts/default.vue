<template>
    <div>
        <header>
            <UContainer class="w-fit py-4">
                <AppHeader />
            </UContainer>
        </header>
        <slot />
        <UContainer
            as="footer"
            class="text-center py-24 text-muted text-sm leading-relaxed"
        >
            <AppFooter />
        </UContainer>
    </div>
</template>
