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
  date,
  crunch,
  title,
  author: { author, displayName, profilePicture },
  content,
  totalUpvote,
  moreActionsHandler,
  moreActions,
  setMoreActions,
  upvoted,
  downvoted,
  reportHandler,
  reportView,
  voteHandler,
  setReportView,
}) => (
  <>
    <Grid item xs={12} sm={12} md={12} lg={9} className={styles.storyHeader}>
      <Link href={{ pathname: `/crunch/${toId(crunch)}` }}>
        <a style={{ fontSize: ".7em" }}>{crunch}</a>
      </Link>
      <h1>
        <Fade right>{title}</Fade>
      </h1>
      <div>
        <Avatar alt={displayName} src={profilePicture} family={"blink"} pathname={`/${author}`} />
        <div>
          <Link href={`/${author}`}>
            <Typography component="a" variant="inherit" color="secondary">{`by ${trimString(displayName, 15)}`}</Typography>
          </Link>
          <Typography color="secondary" variant="subtitle2">{`${dateCalculator({ date })} ● ${time2read(content)}`}</Typography>
        </div>
      </div>
    </Grid>
    <Grid item lg={3} />
    <Grid item xs={12} sm={12} md={12} lg={9} className={styles.storyMain}>
      <article dangerouslySetInnerHTML={{ __html: content }} />
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
    </Grid>

    <Drawer title={title} list={moreActions} displayDrawer={moreActions} setDisplayDrawer={setMoreActions} />

    <Dialog
      dialogTitle="Report view"
      dialogBody={`Reporting this view, will automatically add it to your blacklist, pending when an action is taken. Crunch Moderators won't receive your profile details; Do you wish to proceed. Help us know what's wrong with the view below.`}
      dialogHandler={reportHandler}
      displayDialog={reportView}
      setDisplayDialog={setReportView}
      compareText="feedback"
      proceed="report"
    />
  </>
);

export default View;
