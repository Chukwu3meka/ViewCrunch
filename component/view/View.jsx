import Link from "next/link";
import Fade from "react-reveal/Fade";

import Paper from "@mui/material/Paper";
import UpvoteIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownvoteIcon from "@mui/icons-material/ThumbDown";

import { styles } from "/";
import { Avatar } from "@component/others";
import { shortNumber, dateCalculator } from "@utils/clientFunctions";

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
}) => (
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
          <Typography variant="body2">{`${dateCalculator({ date })} ● ${readTime}`}</Typography>
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

export default View;
