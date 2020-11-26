import React, {FC} from 'react';
import {Marker} from "@react-google-maps/api";
import {GeoPlacemarkPropsType} from "./GeoPlacemark.types";

export const GeoPlacemark: FC<GeoPlacemarkPropsType> = ({lat, lng}) => {
    return (
            <Marker
                position={{
                    lat: lat,
                    lng: lng
                }}
                icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
                draggable={false}
            />
    );
};

