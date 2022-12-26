import { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import TimerTextField from "./TimerTextField";
import { STATUS } from "../utils/constants";

import { sState, actionState, timeState } from "../utils/stateStore";
import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme) => {
  return {
    ms: {
      fontWeight: 500,
    },
  };
});

export default function StopWatchContent() {
  const classes = useStyles();
  const [time, setTime] = useRecoilState(timeState);

  const [sec, setSec] = useRecoilState(sState);
  const [action, setAction] = useRecoilState(actionState);

  const [millisecond, setMillisecond] = useState("00");
  const [intervalObj, setIntervalObj] = useState();

  useEffect(() => {
    switch (action) {
      case STATUS.PLAY:
        setAction(STATUS.RUN);
        let interval = setInterval(tick, 10);
        setIntervalObj(interval);
        break;
      case STATUS.PAUSE:
        clearInterval(intervalObj);
        break;
      case STATUS.RUN:
        setSec(Math.floor(time / 100));
        setMillisecond(time % 100);
        break;
      case STATUS.RESET:
        setTime(0);
        setSec(0);
        setMillisecond("00");
        setAction(STATUS.PAUSE);
        break;
      default:
        break;
    }
  }, [action, time]);

  function tick() {
    setTime((prevTotalsecs) => {
      return ++prevTotalsecs;
    });
  }

  useEffect(() => {
    setTime(0);
    setSec(0);
    setMillisecond("00");
    setAction(STATUS.PAUSE);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalObj);
    };
  }, [intervalObj]);

  return (
    <Grid container spacing={1} alignItems="baseline">
      <Grid item>
        <TimerTextField time={sec} unit="s" disabled={true} />
      </Grid>
      <Grid item>
        <Typography className={classes.ms} variant="h4">
          {millisecond}
        </Typography>
      </Grid>
    </Grid>
  );
}
