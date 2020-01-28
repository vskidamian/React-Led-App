import React, { useState, useCallback, useRef, useEffect } from "react";
import {Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { usePatternStore } from '../stores/PatternStore';

const useStyles = makeStyles({

    button: {
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 10,
    }
}
);

export default function ShowHexColor() {
    const classes = useStyles();
    const [isFetching, setFetching] = useState(false)
    const isComponentMounted = useRef(true)
    const { changeCurrentActivePattern } = usePatternStore()
    useEffect(() => {
        return () => {
            isComponentMounted.current = false
        }
    }, [])

    const useFetchShowColor = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/showcolor').then(async (data) => {
            const json = await data.json();
            console.log(json);
            changeCurrentActivePattern('Chosen Color');
            return json;
        }).catch(err => {
            alert(err);
            return err;
        });
        if (isComponentMounted.current) {
            setFetching(false);
        }
    }, [isFetching]);


    return (
            <Button onClick={useFetchShowColor} variant="contained" style={{ color: "#fff", background: "#00bfa5" }} className={classes.button}>
                <Typography>SHOW</Typography>
            </Button>
    );
}
