import React, {FC, useContext, useEffect, useState} from 'react';
import {Marker} from "@react-google-maps/api";
import {StoresContext} from "../../../stores";
import {reaction} from "mobx";
import {observer} from "mobx-react-lite";
import {LatLngType} from "./AdressMarker.types";



export const AdressMarker: FC = observer(() => {
    const [latLng, setLatLng] = useState<LatLngType>({
        lat: null,
        lng: null,
    })
    const [flagRequest, setFlagRequest] = useState<boolean>(false)
    const [flagUpdateErrorStatus, setflagUpdateErrorStatus] = useState<boolean>(false);

    const { googleStore } = useContext(StoresContext)

    useEffect(() => {
        if (flagUpdateErrorStatus && (googleStore.flagGeocoding === "error"
            || googleStore.flagReverseGeocoding === "error")) {
            googleStore.updateErrorStatus();
            setflagUpdateErrorStatus(false)
        }
    },
        // eslint-disable-next-line
        [flagUpdateErrorStatus])

    useEffect(() => {
            return reaction(() => googleStore.adressLatLng, () => {
                if (googleStore.adressLatLng.lat !== latLng.lat && googleStore.adressLatLng.lng !== latLng.lng) {
                    setLatLng(googleStore.adressLatLng);
                }
            })
        },
        // eslint-disable-next-line
        [latLng]
    )

    useEffect(() => {
        if (flagRequest && latLng.lat !== null && latLng.lng !== null) {
            googleStore.getFormatedAdress(Math.round(latLng.lat *1000000)/1000000, Math.round(latLng.lng * 1000000)/1000000);
            googleStore.changeLatLng(Math.round(latLng.lat *1000000)/1000000, Math.round(latLng.lng * 1000000)/1000000);
            setFlagRequest(false)
        }
    },
        // eslint-disable-next-line
        [flagRequest, latLng])


    const handleDragMarker = (e: google.maps.MouseEvent): void => {
        setLatLng({lat: Math.round(e.latLng.lat() * 1000000)/1000000, lng: Math.round(e.latLng.lng() * 1000000)/1000000});
        setFlagRequest(true)
        if (googleStore.flagGeocoding === "error"
            || googleStore.flagReverseGeocoding === "error") {
            setflagUpdateErrorStatus(true)
        }
    }

    return (
        <>
            { latLng.lat !== null && latLng.lng !== null &&
            <Marker
                position={{
                    lat: latLng.lat,
                    lng: latLng.lng
                }}
                icon={googleStore.flagReverseGeocoding === "ok"
                    ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                    : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                }
                draggable
                onDragEnd={(e: google.maps.MouseEvent) => handleDragMarker(e)}
                label={googleStore.flagReverseGeocoding === "ok"
                    ? ""
                    : "Адрес не найден"
                }
            />
            }
        </>
    );
});

