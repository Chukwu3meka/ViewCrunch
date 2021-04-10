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
import VisibilityIcon from "@material-ui/icons/Visibility";
import CommentIcon from "@material-ui/icons/RateReviewRounded";

import { CommentsContainer } from "/";
import { Avatar } from "@component/others";
import { time2read, trimString, shortNumber, toId, dateCalculator } from "@utils/clientFunctions";
import { SocialShare, Drawer, Dialog } from "@component/others";

const View = ({
  online,
  view,
  date,
  space,
  title,
  author: { author, displayName, profilePicture },

  // upvote,
  content,
  profile,
  comments,

  viewers: { length: viewers },
  upvote: { length: totalUpvote },
  upvote,
  downvote: { length: totalDownvote },
  downvote,
  moreActionsHandler,

  moreActions,
  setMoreActions,
  // forceRefresh,
  // reportView,
  // setReportView,
  // view: { title, displayName, author },
  // viewInFavourite,
  // viewInBlacklist,
  // favouriteHandler,
  // blacklistHandler,
  // reportHandler,
}) => (
  <>
    <Grid item xs={12} sm={12} md={12} lg={9}>
      <Link href={{ pathname: `/space/${toId(space)}` }}>
        <a style={{ fontSize: ".7em" }}>{space}</a>
      </Link>
      <h1>
        <Fade right>{title}</Fade>
      </h1>
      <div>
        <Avatar alt={displayName} src={profilePicture} family={"blink"} pathname={author} />
        <div>
          <Link href={{ pathname: author }}>
            <Typography component="a" variant="inherit" style={{ color: "white" }}>{`by ${trimString(displayName, 15)}`}</Typography>
          </Link>
          <Typography color="secondary" variant="subtitle2">{`${dateCalculator({ date })} ● ${time2read(content)}`}</Typography>
        </div>
      </div>
    </Grid>
    <Grid item lg={3} />
    <Grid item xs={12} sm={12} md={12} lg={9}>
      <article dangerouslySetInnerHTML={{ __html: content }} />
      <Paper>
        <span>
          <IconButton color={upvote.includes(profile?.handle) ? "#1197c0" : "default"}>
            <UpvoteIcon fontSize="inherit" />
          </IconButton>
          <Typography component="span" color="inherit">
            {shortNumber(totalUpvote)}
          </Typography>
          <IconButton color={downvote.includes(profile?.handle) ? "#b91818" : "default"}>
            <DownvoteIcon fontSize="inherit" />
          </IconButton>
        </span>
        <div>
          <IconButton color="secondary">
            <CommentIcon fontSize="inherit" />
          </IconButton>
          <span>{shortNumber(comments?.length || 0)}</span>
          <IconButton color="secondary">
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
          <span>{shortNumber(viewers)}</span>
          <IconButton color="inherit" onClick={moreActionsHandler}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </Paper>
      {/* <CommentsContainer {...{ online, view, profile }} /> */}
    </Grid>
    <>
      <Drawer title={title} list={moreActions} displayDrawer={moreActions} setDisplayDrawer={setMoreActions} />

      {/* {reportView && (
        <Dialog
          proceed="report"
          handler={reportHandler}
          title={`Report View`}
          // forceRefresh={forceRefresh}
          cancelHandler={() => setReportView(false)}
          feedback={true}
          message={`Reporting this view, will automatically add it to your blacklist. Moderators won't receive your profile details; Do you wish to proceed.`}
        />
      )} */}
    </>
  </>
);

export default View;
