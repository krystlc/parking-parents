
export const useFavorites = () => {
  // Use VueUse's useLocalStorage for automatic reactivity and persistence
  const favorites = useLocalStorage<string[]>("park-scout-favorites", []);

  const toggleFavorite = (parkId: string) => {
    const index = favorites.value.indexOf(parkId);
    if (index === -1) {
      favorites.value.push(parkId);
    } else {
      favorites.value.splice(index, 1);
    }
  };

  const isFavorite = (parkId: string) => favorites.value.includes(parkId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
