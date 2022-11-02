import Link from "next/link";
import Dialog from "@component/others/Dialog";

import Fade from "react-reveal/Fade";

import Paper from "@mui/material/Paper";
import UpvoteIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownvoteIcon from "@mui/icons-material/ThumbDown";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Switch from "@mui/material/Switch";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import BlacklistIcon from "@mui/icons-material/VisibilityOff";
import BookmarkIcon from "@mui/icons-material/BookmarkAddRounded";
import ReportIcon from "@mui/icons-material/FlagRounded";

import { styles } from "/";
import { Avatar } from "@component/others";
import { shortNumber, dateCalculator } from "@utils/clientFunctions";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const View = ({
  crunchLink,
  crunch,
  title,
  displayName,
  profilePicture,
  profileLink,
  date,
  readTime,
  content,
  voteHandler,
  upvoted,
  downvoted,
  votes,
  actions,
  report,
  setReport,
  reportHandler,
}) => {
  // const [direction, setDirection] = React.useState("up");
  // const [hidden, setHidden] = React.useState(false);

  // const handleDirectionChange = (event) => {
  //   setDirection(event.target.value);
  // };

  // const handleHiddenChange = (event) => {
  //   setHidden(event.target.checked);
  // };

  return (
    <div className={styles.view}>
      <div>
        <h1>
          <Fade right>{title}</Fade>
        </h1>
        <div>
          <Avatar alt={displayName} src={profilePicture} pathname={profileLink} />
          <div>
            <div>
              <Link href={profileLink}>
                <Typography component="a" variant="inherit" color="secondary">
                  {displayName}
                </Typography>
              </Link>
              {" in "}
              <Link href={crunchLink}>
                <a>{crunch}</a>
              </Link>
            </div>
            <Typography variant="body2">{`Published ${dateCalculator({ date })} ● ${readTime}`}</Typography>
          </div>
        </div>
      </div>
      <Paper dangerouslySetInnerHTML={{ __html: content }} />
      <div>
        <div>
          <IconButton style={{ color: upvoted ? "#1197c0" : "inherit" }} onClick={voteHandler(true)}>
            <UpvoteIcon fontSize="inherit" />
          </IconButton>
          <IconButton style={{ color: downvoted ? "#b91818" : "inherit" }} onClick={voteHandler(false)}>
            <DownvoteIcon fontSize="inherit" />
          </IconButton>
        </div>
        <Typography>{`${shortNumber(votes)} upvote${votes > 1 ? "s" : ""}`}</Typography>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          // direction="left"
          icon={<MoreVertIcon />}
          // sx={{ position: "absolute", bottom: 16, right: 16 }}
        >
          {actions.map(({ icon, name, handler }) => (
            <SpeedDialAction
              color="red"
              key={name}
              id={name}
              // icon={action.icon}
              icon={icon}
              tooltipTitle={name}
              // tooltipOpen
              onClick={handler}
            />
          ))}
        </SpeedDial>
      </div>
      {/* <Drawer title={title} list={moreActions} displayDrawer={moreActions} setDisplayDrawer={setMoreActions} /> */}

      <Dialog
        dialogTitle="Report view"
        dialogBody="Reporting this view, will automatically add it to your blacklist. Kindly give detailed description why you think this view should be flagged, to enable ViewCrunch Moderators act swiftly and precisely on this view."
        dialogHandler={reportHandler}
        displayDialog={report}
        placeholder="start typing to enable report button"
        setDisplayDialog={setReport}
        compareText="feedback"
        proceed="report"
      />
    </div>
  );
};

export default View;
