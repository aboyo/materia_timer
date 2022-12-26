import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TimerTextField from "./TimerTextField";

import { mState, sState, actionState, timeState } from "../utils/stateStore";
import { useRecoilState } from "recoil";

import { STATUS } from "../utils/constants";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "inline-block",
      "&:hover": {
        "&> .MuiDivider-root": {
          background: theme.palette.primary.main,
        },
      },
    },
  };
});

export default function TimerContent() {
  const classes = useStyles();
  const [time, setTime] = useRecoilState(timeState);

  const [min, setMin] = useRecoilState(mState);
  const [sec, setSec] = useRecoilState(sState);

  const [action, setAction] = useRecoilState(actionState);
  const [intervalObj, setIntervalObj] = useState();

  useEffect(() => {
    switch (action) {
      case STATUS.PLAY:
        setTime(Number(min) * 60 + Number(sec));
        if (time > 0) {
          setAction(STATUS.RUN);
          let interval = setInterval(tick, 1000);
          setIntervalObj(interval);
        }
        break;
      case STATUS.PAUSE:
        clearInterval(intervalObj);
        break;
      case STATUS.RUN:
        setMin(Math.floor(time / 60));
        setSec(time % 60);
        if (time === 0) {
          setAction(STATUS.PAUSE);
        }
        break;
      case STATUS.RESET:
        setTime(0);
        setMin(0);
        setSec(0);
        setAction(STATUS.PAUSE);
        break;
      default:
        break;
    }
  }, [action, time]);

  useEffect(() => {
    setTime(0);
    setMin(0);
    setSec(0);
    setAction(STATUS.PAUSE);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalObj);
    };
  }, [intervalObj]);

  function tick() {
    setTime((prevTotalsecs) => {
      if (prevTotalsecs === 0) {
        clearInterval(intervalObj);
        return prevTotalsecs;
      } else {
        return prevTotalsecs - 1;
      }
    });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item>
          <TimerTextField
            time={min}
            unit="m"
            onChange={(value) => {
              setMin(value);
            }}
            disabled={action === STATUS.RUN ? true : false}
          />
        </Grid>
        <Grid item>
          <TimerTextField
            time={sec}
            unit="s"
            onChange={(value) => {
              if (value > 59) {
                setSec(59);
              } else {
                setSec(value);
              }
            }}
            disabled={action === STATUS.RUN ? true : false}
          />
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
}
