import {runInAction, makeAutoObservable} from 'mobx';
import {CrewType, ITaxiStore} from "./taxiStore.types";
import {IRootStore} from "../index";
import {compareCrews} from "../../utils/utils";
import {getCrewsList, createOrderTaxi} from "../../api/baseApi";



export class TaxiStore implements ITaxiStore {

    // зачем тут еще раз прописывать тип каждого поля когда уже
    // все поля стора прописаны в ITaxiStore?
    // причина: https://www.typescriptlang.org/docs/handbook/2/classes.html#cautions
    // По этому поводу до сих пор висит issue в репозиторий Typescript

    sourceTime: string = "";
    crewId: number | null = null;
    crewList: CrewType[] | string = [];
    choosedCrew: CrewType | string = "init";
    resultOrdering: string = "initial";
    rootStore: IRootStore;

    constructor(rootStore: IRootStore) {
        makeAutoObservable(this, { rootStore: false })
        this.rootStore = rootStore
    }

    async getCrews(sourceTime: string, addresses: string) {
        this.crewList = "loading";
        this.choosedCrew = "loading";
            try {
                const res = await getCrewsList(sourceTime, addresses)
                    // в ТЗ не указано есть ли сортировка на бекенде - считаем что нет
                const array = res.data.crews_info.sort(compareCrews);
                runInAction(() => {
                    this.crewList = array
                    this.choosedCrew = array[0];
                    this.crewId = array[0].crew_id;
                })
            } catch(error) {
                runInAction(() => {
                    this.crewList = "error"
                    this.choosedCrew = "error"
                })
            }
    }


    async createOrder(sourceTime: string, addresses: string) {
        this.resultOrdering = "loading";
        try {
            // eslint-disable-next-line
            const res = await createOrderTaxi(sourceTime, addresses, this.crewId as number);
            runInAction(() => {
                this.resultOrdering = "initial";
                this.sourceTime = "";
                this.crewId = null;
                this.crewList = [];
                this.choosedCrew = "init";
                this.resultOrdering = "initial";
                this.rootStore.googleStore.getUpdateStore();
            })
        } catch(error) {
            runInAction(() => {
                this.resultOrdering = "error"
            })
        }
    }
}




