import {IRootStore} from "../index";

export type AdressLatLngType = {
    lat: number | null,
    lng: number | null
}

export interface IGoogleStore {
    rootStore: IRootStore;
    adressLatLng: AdressLatLngType
    formatedAdress: string | null;
    flagGeocoding: string;
    flagReverseGeocoding: string;
    helperTextInput: string
    getLatLng: (adress: string) => Promise<void>;
    getFormatedAdress: (lat: number, lng: number) => Promise<void>;
    changeFormatedAdress: (newFormatedAdress: string) => void;
    changeLatLng: (newAdressLat: number, newAdressLng: number) => void;
    emptyAdressField: () => void;
    getUpdateStore: () => void;
    updateErrorStatus: () => void;
}