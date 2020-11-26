import {CrewType} from "../stores/taxiStore/taxiStore.types";

const formatTwoDigits = (value: string): string => {
    if (value.length !== 2) {
        return `0${value}`;
    } else {
        return value;
    }
}

export const formatDate = (today: Date) => {
    const year = formatTwoDigits(today.getFullYear().toString(10));
    const day = formatTwoDigits(today.getDate().toString(10));
    const mounth = formatTwoDigits((today.getMonth() + 1).toString(10));
    const hours = formatTwoDigits(today.getHours().toString(10));
    const minutes = formatTwoDigits(today.getMinutes().toString(10));
    const sec = formatTwoDigits(today.getSeconds().toString(10));
    return `${year}${mounth}${day}${hours}${minutes}${sec}`;
}

export const compareCrews = (a: CrewType, b: CrewType): number => {
    if (a.distance < b.distance) {
        return -1
    }
    if (a.distance > b.distance) {
        return 1
    }
    return 0
}

export const adressRexExp = (str: string): string | null => {
    const rx = /[а-яА-Я\s.0-9]+,\s[0-9.\sа-яА-Я/]+,\sИжевск/;

    // проверяем
    // 1) из Ижевска ли адрес
    // 2) указаны ли в адресе улица и дом
    const res = rx.exec(str);
    if (res !== null) {

        // возвращаем в требуемом формате улица, дом
        // специально не стала убирать ул. пер. просп.
        // так как возможно в одном городе найдутся "просп. Руставели" и "ул. Руставели"
        return res[0].slice(0, -8)
    } else {
        return null
    }
}

export const inputRexExp = (str: string): string | null => {
    const rx = /^([а-яА-Я\s.0-9]+),\s\d+[a-z/\d]*$/;
    const res = rx.exec(str);
    if (res !== null) {
        return res[0]
    } else {
        return null
    }
}

