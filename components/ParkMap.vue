<template>
    <LMap
        style="height: 50vh"
        :zoom="12"
        :center="[28.1140756, -82.3064378]"
        :use-global-leaflet="false"
    >
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            layer-type="base"
            name="OpenStreetMap"
        />
    </LMap>
</template>
