import Link from "next/link";
import Image from "next/image";
import Fade from "react-reveal/Fade";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import UpvoteIcon from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DownvoteIcon from "@material-ui/icons/ThumbDown";

import { CommentsContainer, styles } from "/";
import { Avatar } from "@component/others";
import { time2read, trimString, shortNumber, toId, dateCalculator } from "@utils/clientFunctions";
import { SocialShare, Drawer, Dialog } from "@component/others";

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
  totalUpvote,
  moreActionsHandler,
}) => {
  // console.log({ profileLink, crunchLink });

  return (
    <div className={styles.view}>
      <div>
        <Link href={crunchLink}>
          <a style={{ fontSize: ".7em" }}>{crunch}</a>
        </Link>
        <h1>
          <Fade right>{title}</Fade>
        </h1>
        <div>
          <Avatar alt={displayName} src={profilePicture} family={"blink"} pathname={profileLink} />
          <div>
            <Link href={profileLink}>
              <Typography component="a" variant="inherit" color="secondary">{`by ${displayName}`}</Typography>
            </Link>
            <Typography color="secondary" variant="subtitle2">{`${dateCalculator({ date })} ● ${readTime}`}</Typography>
          </div>
        </div>
      </div>
      <article dangerouslySetInnerHTML={{ __html: content }} />
      <div>
        <Paper>
          <span>
            <IconButton style={{ color: upvoted ? "#1197c0" : "" }} onClick={voteHandler(true)}>
              <UpvoteIcon fontSize="inherit" />
            </IconButton>
            <IconButton style={{ color: downvoted ? "#b91818" : "" }} onClick={voteHandler(false)}>
              <DownvoteIcon fontSize="inherit" />
            </IconButton>
          </span>
          <div>
            <span>{`${shortNumber(totalUpvote)} upvote${totalUpvote > 1 ? "s" : ""}`}</span>
            <IconButton color="inherit" onClick={moreActionsHandler}>
              <MoreVertIcon />
            </IconButton>
          </div>
        </Paper>
        {/* <CommentsContainer {...{ online, view, profile }} /> */}
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
