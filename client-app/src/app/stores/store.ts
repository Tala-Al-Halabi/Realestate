import { createContext, useContext } from "react";
import PropertyStore from "./propertyStore";

interface Store{
    propertyStore: PropertyStore
}

export const store: Store = {
    propertyStore: new  PropertyStore()
}
;
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}