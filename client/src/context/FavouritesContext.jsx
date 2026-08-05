import React, { createContext, useContext, useEffect, useState } from "react";
const FavouritesContext = createContext();
export const useFavourites = () => useContext(FavouritesContext);
export function FavouritesProvider({ children }) {
  const [ids, setIds] = useState(() => JSON.parse(localStorage.getItem('vidyaverse-favourites') || '[]'));
  useEffect(() => localStorage.setItem('vidyaverse-favourites', JSON.stringify(ids)), [ids]);
  const toggle = id => setIds(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);
  return <FavouritesContext.Provider value={{ ids, toggle }}>{children}</FavouritesContext.Provider>;
}
