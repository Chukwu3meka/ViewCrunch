import Link from "next/link";
import Fade from "react-reveal/Fade";

import Paper from "@material-ui/core/Paper";
import UpvoteIcon from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DownvoteIcon from "@material-ui/icons/ThumbDown";

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
