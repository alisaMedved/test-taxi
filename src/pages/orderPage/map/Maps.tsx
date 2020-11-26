import React, {FC, useContext, useEffect, useState} from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import {observer} from "mobx-react-lite";
import {StoresContext} from "../../../stores";
import {AdressMarker} from "../adressMarker/AdressMarker";
import {CrewMarkers} from "../crewMarkers/CrewMarkers";
import {LatLngType} from "./Maps.types";


export const Maps: FC = observer(() => {

    const [latLng, setLatLng] = useState<LatLngType>({
        lat: null,
        lng: null
    })
    const [flagRequest, setFlagRequest] = useState<boolean>(false)
    const [flagUpdateErrorStatus, setflagUpdateErrorStatus] = useState<boolean>(false);
    const { googleStore } = useContext(StoresContext)

    useEffect(() => {
        if (flagRequest && latLng.lat !== null && latLng.lng !== null) {
            googleStore.getFormatedAdress(Math.round(latLng.lat *1000000)/1000000, Math.round(latLng.lng * 1000000)/1000000);
            googleStore.changeLatLng(Math.round(latLng.lat *1000000)/1000000, Math.round(latLng.lng * 1000000)/1000000);
            setFlagRequest(false)
            setLatLng({
                lat: null,
                lng: null,
            })
        }
    },
        // eslint-disable-next-line
        [flagRequest, latLng])

    useEffect(() => {
        if (flagUpdateErrorStatus) {
            googleStore.updateErrorStatus();
            setflagUpdateErrorStatus(false)
        }
    },
        // eslint-disable-next-line
        [flagUpdateErrorStatus])


    const handleClickMap = (e: google.maps.MouseEvent): void => {
        if (latLng.lng === null && latLng.lat === null) {
            const lat = Math.round(e.latLng.lat() * 1000000)/1000000;
            const lng = Math.round(e.latLng.lng() * 1000000)/1000000;
            setLatLng({lat, lng});
            setFlagRequest(true);
            setflagUpdateErrorStatus(true)
        }
    }

    return (
       <div style={{width: "600px", height: "600px"}}>
           <LoadScript
               googleMapsApiKey="AIzaSyDaFB0mtYbWlKC_w8KYvmvX8r6-nYqIXHI"
               language="ru"
           >
               <GoogleMap
                   mapContainerStyle={{
                       width: '600px',
                       height: '600px'
                   }}
                   center={{
                       lat: 56.862182,
                       lng: 53.231939
                   }}
                   zoom={15}
                   onClick={(e: google.maps.MouseEvent) => handleClickMap(e)}

               >
                       <AdressMarker />
                   <CrewMarkers />
               </GoogleMap>
           </LoadScript>
       </div>
    );
});
