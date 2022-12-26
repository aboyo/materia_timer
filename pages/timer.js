import Box from "@material-ui/core/Box";
import TimerCard from "../components/TimerCard";
import { RecoilRoot } from "recoil";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "50%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  };
});

export default function Timer() {
  const classes = useStyles();

  return (
    <Box className={classes.root} m={1}>
      <RecoilRoot>
        <TimerCard />
      </RecoilRoot>
    </Box>
  );
}
