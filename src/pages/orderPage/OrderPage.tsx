import React, {FC, useContext, useEffect, useState} from 'react';
import {Divider, CircularProgress, Button, Typography} from '@material-ui/core';
import {ChoosedCrew} from "./choosedCrew/ChoosedCrew";
import {Maps} from "./map/Maps"
import {CrewList} from "./crewList/CrewList";
import {StoresContext} from "../../stores";
import {observer} from "mobx-react-lite";
import {AdressField} from "./adressField/AdressField";
import styles from './OrderPage.module.scss';
import {formatDate} from "../../utils/utils";
import clsx from 'clsx';


export const OrderPage: FC = observer(() => {

    const [flagRequest, setFlagRequest] = useState<boolean>(false)
    const {taxiStore, googleStore} = useContext(StoresContext);



    useEffect(() => {
        if (flagRequest && typeof taxiStore.crewId === "number" && googleStore.formatedAdress !== null && googleStore.formatedAdress.length !== 0) {
            const today = new Date();
            taxiStore.createOrder(formatDate(today), googleStore.formatedAdress);
            setFlagRequest(false)
        } else {
            if ((googleStore.formatedAdress !== null && googleStore.formatedAdress.length === 0 && flagRequest) || googleStore.formatedAdress === null && flagRequest) {
                googleStore.emptyAdressField()
                setFlagRequest(false)
            }
        }

    },
        // eslint-disable-next-line
        [flagRequest])


    const handleSubmit = (): void => {
        setFlagRequest(true)
    };

    return (
        <div className={styles.wrapperForm}>
            <div className={clsx({
                [styles.loadingForm]: taxiStore.resultOrdering === "loading",
                [styles.fetchedForm]: taxiStore.resultOrdering === "inital" || taxiStore.resultOrdering === "error",
                [styles.createdOrderForm]: taxiStore.resultOrdering === "fetched",
                })}>
            <Typography variant="h5">Детали заказа</Typography>
            <Divider />
            <div className={styles.addressField}>
                <AdressField  />
            </div>
            <ChoosedCrew />
            <div className={styles.mapAndCrews}>
               <Maps />
                <CrewList />
            </div>
            <div className={styles.btn}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={taxiStore.resultOrdering === "loading"}
                >Заказать</Button>
            </div>
                <div>
                    {
                        flagRequest && typeof taxiStore.crewId === null && <div>Ошибка сервера: пришел некорректный id подходящего экипажа.
                            Обратитесь в службу поддержки.</div>
                    }
                    {
                        taxiStore.resultOrdering === "error" && <div>
                            Ошибка сервера. Заказ не был создан! Попробуйте еще раз.
                        </div>
                    }
                </div>
        </div>
                {taxiStore.resultOrdering === "loading"
                    && <div className={styles.spinnerOrFetched}
                >
                    <CircularProgress/>
                </div>
                }
            </div>
    );
});

