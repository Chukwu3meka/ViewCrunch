import Link from "next/link";
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

const actions = [
  { icon: <BlacklistIcon />, name: "Blcaklist" },
  { icon: <BookmarkIcon />, name: "Bookmark" },
  { icon: <ReportIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

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
  moreActionsHandler,
  moreActions,
  setMoreActions,
}) => {
  const [direction, setDirection] = React.useState("up");
  const [hidden, setHidden] = React.useState(false);

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };
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
        <span>
          <IconButton style={{ color: upvoted ? "#1197c0" : "" }} onClick={voteHandler(true)}>
            <UpvoteIcon fontSize="inherit" />
          </IconButton>
          <IconButton style={{ color: downvoted ? "#b91818" : "" }} onClick={voteHandler(false)}>
            <DownvoteIcon fontSize="inherit" />
          </IconButton>
        </span>
        <div>
          <span>{`${shortNumber(votes)} upvote${votes > 1 ? "s" : null}`}</span>
          <IconButton color="inherit" onClick={moreActionsHandler}>
            <MoreVertIcon />
          </IconButton>
        </div>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          // direction="left"
          icon={<MoreVertIcon />}
          // sx={{ position: "absolute", bottom: 16, right: 16 }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              color="red"
              key={action.name}
              // icon={action.icon}
              icon={action.icon}
              tooltipTitle={action.name}
              // tooltipOpen
              // onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </div>
      {/* <Drawer title={title} list={moreActions} displayDrawer={moreActions} setDisplayDrawer={setMoreActions} /> */}

      {/* <Dialog
      dialogTitle="Report view"
      dialogBody={`Reporting this view, will automatically add it to your blacklist, pending when an action is taken. Crunch Moderators won't receive your profile details; Do you wish to proceed. Help us know what's wrong with the view below.`}
      dialogHandler={reportHandler}
      displayDialog={reportView}
      setDisplayDialog={setReportView}
      compareText="feedback"
      proceed="report"
    /> */}
    </div>
  );
};

export default View;
