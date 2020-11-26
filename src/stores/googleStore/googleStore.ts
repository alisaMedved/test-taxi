import {runInAction, makeAutoObservable} from 'mobx';
import {AdressLatLngType, IGoogleStore} from "./googleStore.types";
import {IRootStore} from "../index";
import {geocode, reverseGeocode} from "../../api/googleApi";
import {adressRexExp, formatDate} from "../../utils/utils";




export class GoogleStore implements IGoogleStore {

    // зачем тут еще раз прописывать тип каждого поля когда уже
    // все поля стора прописаны в ITaxiStore?
    // причина: https://www.typescriptlang.org/docs/handbook/2/classes.html#cautions
    // По этому поводу до сих пор висит issue в репозиторий Typescript

    adressLatLng: AdressLatLngType = {
        lat: null,
        lng: null
    };
    formatedAdress: string | null = null;
    flagReverseGeocoding: string = "ok"
    flagGeocoding: string = "ok";
    helperTextInput: string = "";
    rootStore: IRootStore;

    constructor(rootStore: IRootStore) {
        makeAutoObservable(this, { rootStore: false })
        this.rootStore = rootStore
    }

    async getFormatedAdress(lat: number, lng: number): Promise<void> {
        try {
            const res = await reverseGeocode(lat, lng)
            // можно и по res.data.status = "ZERO_RESULTS" - согласно доке Google Maps API это один и тот же случай response
            if (res.data.results.length === 0) {
                runInAction(() => {
                    this.flagReverseGeocoding = "error"
                    this.helperTextInput = "Указанный адрес в городе Ижевск не найден."
                    this.formatedAdress = ""
                })
            } else {
                const formatedAdress = adressRexExp(res.data.results[0].formatted_address)
                if (formatedAdress !== null) {
                    const today = new Date();
                    this.rootStore.taxiStore.getCrews(formatDate(today), formatedAdress);
                    runInAction(() => {
                        this.formatedAdress = formatedAdress
                    })
                } else {
                    runInAction(() => {
                        this.flagReverseGeocoding = "error"
                        this.helperTextInput = "Ошибка в адресе. Возможно Вы поставили маркер не рядом с каким-нибудь домом. Или пытаетесь указать адрес не в Ижевске."
                        this.formatedAdress = ""
                    })
                }
            }
        } catch(error) {
            runInAction(() => {
                this.flagReverseGeocoding = "error"
                this.helperTextInput = "Ошибка! Неожиданный ответ от сервера."
                this.formatedAdress = ""
            })
        }
    }

    async getLatLng(adress: string): Promise<void> {
        try {
            const res = await geocode(adress)
            // можно и по res.data.status = "ZERO_RESULTS" - согласно доке Google Maps API это один и тот же случай response
            if (res.data.candidates.length !== 0) {
                const today = new Date();
                if (this.formatedAdress !== null) {
                    this.rootStore.taxiStore.getCrews(formatDate(today), this.formatedAdress);
                }
                runInAction(() => {
                    this.adressLatLng = res.data.candidates[0].geometry.location
                })
            } else {
                runInAction(() => {
                    this.formatedAdress = ""
                    this.helperTextInput = "Указанный адрес в городе Ижевск не найден."
                    this.flagGeocoding = "error"
                    this.adressLatLng = {
                        lat: null,
                        lng: null,
                    }
                })
            }
        } catch(error) {
            runInAction(() => {
                this.formatedAdress = ""
                this.helperTextInput = "Ошибка! Неожиданный ответ от сервера."
                this.flagGeocoding = "error"
                this.adressLatLng = {
                    lat: null,
                    lng: null,
                }
            })
        }
    }

    changeFormatedAdress(newFormatedAdress: string): void {
        this.formatedAdress = newFormatedAdress;
    }
    changeLatLng(newAdressLat: number, newAdressLng: number): void {
        this.adressLatLng = {
            lat: newAdressLat,
            lng: newAdressLng
        };
    }
    emptyAdressField(): void {
        this.flagGeocoding = "error"
        this.flagReverseGeocoding = "error"
        this.helperTextInput = "Обязательное поле! Укажите адрес."
    }
    getUpdateStore(): void {
        this.adressLatLng = {
            lat: null,
            lng: null,
        };
        this.formatedAdress = null;
        this.flagReverseGeocoding= "ok"
        this.flagGeocoding = "ok";
        this.helperTextInput = "";
    }
    updateErrorStatus(): void {
        this.flagReverseGeocoding = "ok"
        this.flagGeocoding = "ok"
        this.helperTextInput = "";
    }
}




