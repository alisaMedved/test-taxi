// import axios from 'axios';
import newCrewList from "../db/getCrewList.json";
import creatingOrderResult from "../db/createOrder.json";



//
// const apiBase = axios.create({
//     baseURL: "базовый url",
// });


export const getCrewsList = (sourceTime: string, addresses: string): Promise<typeof newCrewList> => {

    // вот что функция по замыслу должна делать если бы у меня на руках было бы готовое api

    // return apiBase.request({
    //     url: 'url запроса',
    //     method: 'post',
    //     data: {
    //         source_time: sourceTime,
    //         "addresses":[
    //             {
    //                 "address": addresses,
    //                 "lat":56.839439,
    //                 "lon":53.218803
    //             }
    //         ]
    //     }
    //     ,
    // });

    // mock данных приходящих с сервера


    const setTimeoutPromise = (fn: () => typeof newCrewList, delay: number): Promise<typeof newCrewList> => {
        return new Promise( (resolve, reject) => {
            return setTimeout(() => {
                resolve(fn())
            }, delay)
        })
    }

    return setTimeoutPromise(() => {
        return newCrewList;
    }, 5000);
}

export const createOrderTaxi = (source_time: string, address: string, crew_id: number): Promise<typeof creatingOrderResult> => {

    // вот что функция по замыслу должна делать если бы у меня на руках было бы готовое api

    // return apiBase.request({
    //     url: 'url запроса',
    //     method: 'post',
    //     data: {
    //         source_time,
    //         "addresses":[
    //             {
    //                 address,
    //                 "lat":56.839439,
    //                 "lon":53.218803
    //             }
    //         ],
    //         crew_id,
    //     },
    // });

    // mock данных приходящих с сервера

    const setTimeoutPromise = (fn: () => typeof creatingOrderResult, delay: number): Promise<typeof creatingOrderResult> => {
        return new Promise( (resolve, reject) => {
            return setTimeout(() => {
                resolve(fn())
            }, delay)
        })
    }

    return setTimeoutPromise(() => {
        return creatingOrderResult;
    }, 5000);
}


