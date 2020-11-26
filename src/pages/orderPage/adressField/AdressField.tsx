import React, {FC, useContext, useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import {StoresContext} from "../../../stores";
import {reaction} from "mobx";
import {observer} from "mobx-react-lite";
import {inputRexExp} from "../../../utils/utils";

export const AdressField: FC = observer(() => {
    const [formatedAdress, setFormatedAdress] = useState<string>("");
    const [flagRequest, setFlagRequest] = useState<boolean>(false);
    const [flagUpdateErrorStatus, setflagUpdateErrorStatus] = useState<boolean>(false);
    const [maskFlag, setMaskFlag] = useState<boolean>(false);

    const {googleStore} = useContext(StoresContext);

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
            return reaction(() => googleStore.formatedAdress, () => {
                if (googleStore.formatedAdress !== formatedAdress) {
                    if (googleStore.formatedAdress === null) {
                        setFormatedAdress("");
                    } else {
                        setFormatedAdress(googleStore.formatedAdress);
                    }
                }
            })
        },
        // eslint-disable-next-line
        [formatedAdress]
    )

    useEffect(() => {
        if (flagRequest) {
            googleStore.changeFormatedAdress(formatedAdress);
            googleStore.getLatLng(formatedAdress + ", Ижевск, республика Удмуртия, Россия");
            setFlagRequest(false);
        }
    },
        // eslint-disable-next-line
        [flagRequest, formatedAdress]);

    const handleChange = (value: string): void => {
        setFormatedAdress(value);
        if (googleStore.flagGeocoding === "error"
            || googleStore.flagReverseGeocoding === "error") {
            setflagUpdateErrorStatus(true)
        }
        if (maskFlag) {
            setMaskFlag(false);
        }
    }
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter' && formatedAdress.length !== 0) {
            if (inputRexExp(formatedAdress) !== null) {
                setFlagRequest(true);
            } else {
                setMaskFlag(true);
            }
        }
    }

    return (
        <TextField
            label="Откуда"
            onChange={event => handleChange(event.target.value)}
            value={formatedAdress}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(event)}
            placeholder="ул. Пушкинская, 144"
            error = {googleStore.flagGeocoding === "error"
            || googleStore.flagReverseGeocoding === "error" || maskFlag}
            helperText={maskFlag ? `${googleStore.helperTextInput} Не правильный формат ввода адреса` : googleStore.helperTextInput}
            fullWidth
        />
    );
});

