import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import TabPanel from "../components/TabPanel";
import { Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import { actionState, mState, sState, pageState } from "../utils/stateStore";
import { useRecoilState, useRecoilValue } from "recoil";

import { STATUS, PAGE } from "../utils/constants";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      "&> .MuiCardContent-root": {
        padding: 0,
      },
    },
    button: {
      "& .MuiButton-label": {
        color: theme.palette.primary.main,
      },
      "&:hover": {
        background: theme.palette.primary.main,
        "& .MuiButton-label": {
          color: theme.palette.getContrastText(theme.palette.primary.main),
        },
      },
      "&:disabled": {
        "& .MuiButton-label": {
          color: grey[400],
        },
      },
    },
    action: {
      padding: theme.spacing(2),
    },
  };
});

export default function TimerCard() {
  const classes = useStyles();
  const [action, setAction] = useRecoilState(actionState);
  const min = useRecoilValue(mState);
  const sec = useRecoilValue(sState);
  const page = useRecoilValue(pageState);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <TabPanel />
      </CardContent>
      <Divider />
      <CardActions classes={{ spacing: classes.action }}>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              className={classes.button}
              size="small"
              variant="outlined"
              onClick={() => {
                if (page === PAGE.TIMER) {
                  setAction(
                    action === STATUS.PAUSE && min + sec !== 0
                      ? STATUS.PLAY
                      : STATUS.PAUSE
                  );
                } else {
                  setAction(
                    action === STATUS.PAUSE ? STATUS.PLAY : STATUS.PAUSE
                  );
                }
              }}
            >
              {/* START */}
              {action !== STATUS.PAUSE ? "PAUSE" : "START"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              size="small"
              variant="outlined"
              disabled={action === STATUS.RUN ? true : false}
              onClick={() => {
                setAction(STATUS.RESET);
              }}
            >
              RESET
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
