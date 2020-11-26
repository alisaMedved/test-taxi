import React, {FC, useContext} from 'react';
import {StoresContext} from "../../../stores";
import {Crew} from "../crew/Crew";
import {observer} from "mobx-react-lite";
import {CircularProgress} from "@material-ui/core";
import styles from "./CrewList.module.scss";


export const CrewList: FC = observer(() => {
    const { taxiStore } = useContext(StoresContext)
    return (
        <div className={styles.crewList}>
            { typeof taxiStore.crewList !== "string" && taxiStore.crewList.length !== 0
            && taxiStore.crewList.map((crew) => (
                    <Crew
                        key={crew.crew_id}
                        mark={crew.car_mark}
                        model={crew.car_model}
                        color={crew.car_color}
                        distance={crew.distance}
                    />))
            }
            {
                typeof taxiStore.crewList === "string" && taxiStore.crewList === "error"
                && <div>
                    Ошибка запроса
                </div>
            }
            {
                typeof taxiStore.crewList === "string" && taxiStore.crewList === "loading"
                && <div>
                    <CircularProgress />
                </div>
            }
        </div>
    );
});

