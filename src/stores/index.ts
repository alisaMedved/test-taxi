import {TaxiStore} from "./taxiStore/taxiStore";

import {createContext} from "react"
import {ITaxiStore} from "./taxiStore/taxiStore.types";
import {IGoogleStore} from "./googleStore/googleStore.types";
import {GoogleStore} from "./googleStore/googleStore";

export interface IRootStore {
    taxiStore: ITaxiStore
    googleStore: IGoogleStore
}


export class RootStore implements IRootStore {
    taxiStore: ITaxiStore;
    googleStore: IGoogleStore;
    constructor() {
        this.taxiStore = new TaxiStore(this)
        this.googleStore = new GoogleStore(this)
    }
}

export const rootStore: IRootStore = new RootStore();

export const StoresContext = createContext<IRootStore>({} as IRootStore);