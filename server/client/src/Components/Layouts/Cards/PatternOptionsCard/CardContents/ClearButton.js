import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { usePatternStore } from '../../../../stores/PatternStore';

const useStyles = makeStyles({

    button: {

    }
}
);

export default function ClearButton() {
    const classes = useStyles();
    const { changeCurrentActivePattern } = usePatternStore();

    const [isFetching, setFetching] = useState(false)
    const isComponentMounted = useRef(true)

    useEffect(() => {
        return () => {
            isComponentMounted.current = false
        }
    }, [])

    const useFetchOff = useCallback(async () => {
    if (isFetching) {
        return;
    }
    setFetching(true);
    const result = await fetch('http://localhost:5000/off').then(async (data) => {
        const json = await data.json();
    console.log(json);
    changeCurrentActivePattern('NONE');
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

                    <Button onClick={useFetchOff} variant="contained" color="secondary" size="small" className={classes.button}>
                    <Typography>CLEAR</Typography>
                    </Button>
    );
}