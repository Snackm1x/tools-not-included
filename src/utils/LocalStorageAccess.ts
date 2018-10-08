import LocalStorageKeys from "../constants/LocalStorageKeys";

export function getFavorites() : string[] {
    var favs = localStorage.getItem(LocalStorageKeys.FavoriteSeeds);

    if (favs === null)
        return [];

    return favs.split(',');       
}