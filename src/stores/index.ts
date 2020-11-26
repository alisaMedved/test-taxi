import {TaxiStore} from "./taxiStore/taxiStore";

import {createContext} from "react"
import {ITaxiStore} from "./taxiStore/taxiStore.types";
import {IGoogleStore} from "./googleStore/googleStore.types";
import {GoogleStore} from "./googleStore/googleStore";

export interface IRootStore {
    taxiStore: ITaxiStore
    googleStore: IGoogleStore
}

// почему концепция мультистора? Я исхожу из того что ТЗ - лишь небольшая часть большого приложения

// запихнула вес функционал в один стор taxiStore и не стала создавать несколько сторов
// так как вижу не весь функционал большого приложения и потому не могу понять как лучше поделить сторы

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