import axios from 'axios';


const proxyurl = "https://cors-anywhere.herokuapp.com/";

const apiBase = axios.create({
    baseURL: proxyurl + "https://maps.googleapis.com/maps/api",
    headers: {'Access-Control-Allow-Origin': '*'}
});

type ReverseGeocodeResultType = {
    "formatted_address": string,
    _?: any,
}
type ReverseGeocodeResponseType = {
    data: {
        results: ReverseGeocodeResultType[],
        _?: any,
    }
}
type CandidatType = {
    geometry: {
        "location": {
            "lat": number,
            "lng": number
        },
    }
}
type GeocodeResponseType = {
    data: {
        candidates: CandidatType[],
        _?: any,
    }
    _?: any,
}

export const reverseGeocode = (lat: number, lng: number): Promise<ReverseGeocodeResponseType> => {

    return apiBase.request({
        url: `/geocode/json?latlng=${lat},${lng}&key=AIzaSyDaFB0mtYbWlKC_w8KYvmvX8r6-nYqIXHI`,
        method: 'get',
    })
}

export const geocode = (adress: string): Promise<GeocodeResponseType> => {
    return apiBase.request({
        url: `/place/findplacefromtext/json?key=AIzaSyDaFB0mtYbWlKC_w8KYvmvX8r6-nYqIXHI&input=${adress}&inputtype=textquery&language=ru&fields=geometry`,
        method: 'get',
    })
}