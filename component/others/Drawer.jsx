import clsx from "clsx";
import { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer({ title, list, displayDrawer, setDisplayDrawer }) {
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDisplayDrawer(open);
  };

  return (
    <Drawer anchor={"bottom"} open={displayDrawer} onClose={toggleDrawer(false)}>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: "bottom",
        })}
        role="moreActions"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}>
        <>
          <Typography variant="body2">{title}</Typography>
          {list?.map(({ label, jsx, handler }, index, arr) => (
            <span
              onClick={() => handler()}
              key={index}
              style={{
                padding: "5px 10px",
                textAlign: "center",
                display: "block",
                borderBottom: arr.length - 1 !== index ? "1px solid grey" : "",
              }}>
              {jsx || (
                <Typography align="center" variant="button">
                  {label}
                </Typography>
              )}
            </span>
          ))}
        </>
      </div>
    </Drawer>
  );
}
