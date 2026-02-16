export const useUserLocation = () => {
  const { coords, resume, pause } = useGeolocation()

  const userCoords = computed(() => {
    if (coords.value.latitude !== Infinity) {
      return [coords.value.latitude, coords.value.longitude]
    }
    return null
  })

  return { userCoords, resume, pause }
}
