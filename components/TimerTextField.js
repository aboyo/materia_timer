import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    inputBase: {
      alignItems: "baseline",
    },
    input: {
      width: "100%",
      ...theme.typography.h2,
      fontWeight: 400,
      textAlign: "right",
    },
    disabled: {
      color: "black",
    },
  };
});

export default function TimerTextField(props) {
  const { unit = "s", onChange = null, time, disabled = false } = props;
  const classes = useStyles();

  return (
    <InputBase
      value={time}
      // value={time < 10 ? "0" + time : time}
      className={classes.inputBase}
      classes={{
        input: classes.input,
        disabled: classes.disabled,
      }}
      onChange={(event) => {
        // setValue(25 + event.target.value.length * 35);
        let v = event.target.value;
        if (onChange) {
          onChange(Number(v));
        }
      }}
      disabled={onChange ? false : true}
      endAdornment={
        <InputAdornment position="end">
          <Typography className={classes.disabled} variant="h5">
            {unit}
          </Typography>
        </InputAdornment>
      }
      disabled={disabled}
      // style={{ minWidth: 96, width: value }}
      style={{
        // minWidth: 96,
        minWidth: 64,
        width: time ? 25 + time.toString().length * 35 : 0,
      }}
    />
  );
}
