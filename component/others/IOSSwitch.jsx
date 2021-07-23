import { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";
import { sleep } from "@utils/clientFunctions";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// const IOSSwitch = (color) => {
//   return withStyles((theme) => ({
const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "3fac",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#3fc",
      border: "6px solid #fac",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, color, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
// };

const IOSSwitchJsx = ({ state, stateName, setState, title, color = "#935" }) => {
  const [focus, setFocus] = useState(false);
  const clickHandler = async () => {
    setFocus(true);
    await sleep(0.1);
    setFocus(false);
  };

  useEffect(() => {
    if (focus) clickHandler();
    return () => setFocus(false);
  }, [focus]);

  return (
    <span onClick={() => setFocus(true)}>
      <FormLabel component="legend" color="secondary" style={{ color: focus ? "#335" : "" }}>
        {title}
      </FormLabel>
      <FormControlLabel
        info={
          <IOSSwitch color={color} checked={state} onChange={(e) => setState({ state: e.target.checked, stateName })} name={title} />
        }
      />
    </span>
  );
};

export default IOSSwitchJsx;
