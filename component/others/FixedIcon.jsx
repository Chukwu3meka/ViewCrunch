import { styles } from "/";
import Link from "next/link";
import { useState } from "react";

import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import BackupIcon from "@material-ui/icons/Backup";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowLeftAltIcon from "@material-ui/icons/KeyboardBackspace";

const FixedIcon = ({ icon, clickHandler, pathname }) => {
  const [showIcons, setShowIcons] = useState(true);

  switch (icon) {
    case "publish": {
      return showIcons ? (
        <Paper elevation={0} className={styles.fixedIconPublish}>
          <Tooltip title="Insert Image">
            <IconButton aria-label="insert">
              <InsertPhotoIcon />
              <input
                type="file"
                onChange={clickHandler?.image}
                // accept=".jpg, .jpeg, .png"
                accept="image/*"
                multiple
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  top: "-35px",
                  left: 0,
                  height: "calc(100% + 36px)",
                  width: "calc(100% + 5px)",
                  outline: "none",
                }}
              />
            </IconButton>
          </Tooltip>
          <IconButton aria-label="scroll" onClick={clickHandler?.up}>
            <Tooltip title="scroll top">
              <ArrowUpwardIcon fontSize="small" />
            </Tooltip>
          </IconButton>
          <IconButton aria-label="scroll" onClick={clickHandler?.down}>
            <Tooltip title="scroll bottom">
              <ArrowDownwardIcon />
            </Tooltip>
          </IconButton>
          <IconButton aria-label="hide/show" onClick={() => setShowIcons(false)}>
            <Tooltip title="hide/show">
              <ArrowRightAltIcon />
            </Tooltip>
          </IconButton>
        </Paper>
      ) : (
        <Paper elevation={0} className={styles.fixedIconPublish} style={{ right: "-10px", padding: "0px !important" }}>
          <IconButton aria-label="scroll" onClick={() => setShowIcons(true)}>
            <Tooltip title="scroll bottom">
              <ArrowLeftAltIcon fontSize="small" />
            </Tooltip>
          </IconButton>
        </Paper>
      );
    }

    default:
      return (
        <IconButton className={styles.fixedIcon} onClick={clickHandler}>
          {icon}
        </IconButton>
      );

    // return (
    // <Link href={{ pathname: `/${pathname}` }}>
    //   <span>
    //     <AddCircleIcon color="primary" className={styles.fixedIcon} onClick={clickHandler} />
    //   </span>
    // </Link>
    // );
  }
};

export default FixedIcon;
