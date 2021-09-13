import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import PropertyStore from "./propertyStore";

interface Store{
    propertyStore: PropertyStore;
    commonStore: CommonStore;
}

export const store: Store = {
    propertyStore: new  PropertyStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}