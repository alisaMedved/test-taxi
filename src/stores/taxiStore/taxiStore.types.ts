import {IRootStore} from "../index";


export type CrewType = {
    "crew_id": number,
    "car_mark": string,
    "car_model": string,
    "car_color": string,
    "car_number": string,
    "driver_name": string,
    "driver_phone": string,
    "lat": number,
    "lon": number,
    "distance": number,
};

export interface ITaxiStore {
    rootStore: IRootStore;
    sourceTime: string;
    crewId: number | null;
    crewList: CrewType[] | string;
    choosedCrew: CrewType | string;
    resultOrdering: string;
    getCrews: (sourceTime: string, addresses: string) => void
    createOrder: (sourceTime: string, addresses: string) => void
}
