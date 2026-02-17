<template>
    <div class="h-screen w-screen flex flex-col overflow-hidden">
        <UContainer as="header" class="p-2 border-b border-muted">
            <AppHeader />
        </UContainer>
        <div class="overflow-auto flex-1">
            <slot />
        </div>
    </div>
</template>
