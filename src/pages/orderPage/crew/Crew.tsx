import React, {FC} from 'react';
// @ts-ignore
import {CrewPropsType} from "./Crew.types";
import {Card, CardContent, Typography} from "@material-ui/core";
import styles from "./Crew.module.scss";

export const Crew: FC<CrewPropsType> = ({
    mark,
                         model,
    color,
                         distance,
                     }) => {
    return (
        <Card className={styles.card}>
            <CardContent>
            <Typography>{`${mark} ${model}`}</Typography>
            <Typography>{color}</Typography>
            <Typography>{`${distance} м`}</Typography>
                </CardContent>
        </Card>
    );
};

