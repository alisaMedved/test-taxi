import React, {FC, useContext} from 'react';
import {StoresContext} from "../../../stores";
import { observer } from "mobx-react-lite"
import {Card, CardContent, CircularProgress, Typography} from "@material-ui/core";
import styles from "./ChoosedCrew.module.scss";


export const ChoosedCrew: FC = observer(() => {
    const {taxiStore} = useContext(StoresContext);
    return (
        <div className={styles.chosedCrew}>
            {
                typeof taxiStore.choosedCrew === "string" && taxiStore.choosedCrew === "init"
                && <div className={styles.empty}>
                    <Typography>
                        Подходящий экипаж:
                    </Typography>
                </div>
            }
            {typeof taxiStore.choosedCrew !== "string" &&
            <Card className={styles.card}>
                <CardContent>
                    <Typography>Подходящий экипаж</Typography>
                <Typography>{`${taxiStore.choosedCrew.car_mark} ${taxiStore.choosedCrew.car_model}`}</Typography>
                <Typography>{taxiStore.choosedCrew.car_color}</Typography>
                <Typography>{taxiStore.choosedCrew.car_number}</Typography>
                    </CardContent>
            </Card>}
            {
                typeof taxiStore.choosedCrew === "string" && taxiStore.choosedCrew === "error"
                && <div>
                    Ошибка запроса
                </div>
            }
            {
                typeof taxiStore.choosedCrew === "string" && taxiStore.choosedCrew === "loading"
                && <div>
                    <CircularProgress />
                </div>
            }
            </div>
    );
});

