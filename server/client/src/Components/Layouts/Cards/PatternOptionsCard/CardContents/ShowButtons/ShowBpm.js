import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { usePatternStore } from '../../../../../stores/PatternStore';

const useStyles = makeStyles(theme => ({
  button: {
      marginLeft: 20,
      marginTop: 5,
      marginBottom: 5,
    },
}));

export default function ShowBpm() {
    const classes = useStyles();
    const [isFetching, setFetching] = useState(false)
    const isComponentMounted = useRef(true)

    const [spacing, setSpacing] = React.useState(2);


    const { changeCurrentActivePattern } = usePatternStore();

    const handleChange = event => {
        setSpacing(Number(event.target.value));
      };


    useEffect(() => {
        return () => {
            isComponentMounted.current = false
        }
    }, [])

    const useFetchBeat = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/beat').then(async (data) => {
            const json = await data.json();
        console.log(json);
        changeCurrentActivePattern('BPM');
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
        <Button onClick={useFetchBeat} variant="contained" style={{ color: "#fff", background: "#00bfa5" }} size="small" className={classes.button}>
            <Typography>SHOW</Typography>
        </Button>
    );}