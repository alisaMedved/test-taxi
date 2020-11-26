import React, {useContext} from 'react';
import {GeoPlacemark} from "../geoPlacemark/GeoPlacemark";
import {StoresContext} from "../../../stores";
import {observer} from "mobx-react-lite";

export const CrewMarkers = observer(() => {
    const { taxiStore } = useContext(StoresContext)
    return (
        <div>
            { typeof taxiStore.crewList !== "string" && taxiStore.crewList.length !== 0
            && taxiStore.crewList.map((crew) => (
                <GeoPlacemark lat={crew.lat} lng={crew.lon} key={crew.crew_id}/>
            ))
            }
        </div>
    );
});

