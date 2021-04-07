import { styles } from "/";
import { Avatar } from "@component/others";
import { trimString } from "@utils/clientFunctions";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import RestoreIcon from "@material-ui/icons/Restore";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Fade from "react-reveal/Fade";
import TransitionGroup from "react-transition-group/TransitionGroup";

const CommentsJSX = ({ author, picture, comment, date = new Date().toDateString() }) => (
  <div className={styles.comment}>
    <Avatar alt={trimString(author, 30)} src={picture} />
    <div>
      <Typography variant="body2" color="textSecondary">
        {author}
      </Typography>
      <Typography variant="body2" component="span" style={{ fontSize: "1em" }}>
        {comment}
      </Typography>
      <Typography variant="caption" color="textSecondary" component="i">
        {date}
      </Typography>
    </div>
  </div>
);

const Comments = ({
  lessMore,
  comments,
  newComment,
  addComment,
  lessMoreFunc,
  setNewComment,
  newestComment,
  myDisplayName,
  myProfilePicture,
}) => (
  <Paper elevation={1}>
    {`● ${comments?.length || 0} Comment${comments?.length > 1 ? "s" : ""} ●`}

    <div>
      <TransitionGroup {...{ appear: true, enter: true, exit: true }}>
        {comments?.map(({ comment, date, displayName, profilePicture }, index) => {
          if (((lessMore && index < lessMore) || !lessMore) && comment) {
            return (
              <Fade key={index} collapse bottom>
                <CommentsJSX {...{ author: displayName, picture: profilePicture, comment, date }} />
              </Fade>
            );
          }
        })}
      </TransitionGroup>
    </div>

    {newestComment && comments.length > lessMore ? (
      <CommentsJSX {...{ author: myDisplayName, picture: myProfilePicture, comment: newComment }} />
    ) : (
      <div />
    )}

    <span>
      {comments?.length > 5 && lessMore > 5 && (
        <IconButton onClick={lessMoreFunc("minus")}>
          <ExpandLessIcon />
        </IconButton>
      )}
      {lessMore > 5 && (
        <IconButton onClick={lessMoreFunc()}>
          <RestoreIcon />
        </IconButton>
      )}
      {comments?.length > 5 && lessMore < comments?.length && (
        <IconButton onClick={lessMoreFunc("plus")}>
          <ExpandMoreIcon />
        </IconButton>
      )}
    </span>

    <div>
      <TextField
        variant="outlined"
        fullWidth
        color="secondary"
        size="small"
        error={!!newComment && newComment.length < 13}
        label="write comment here"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button color="secondary" variant="outlined" onClick={addComment}>
        Add
      </Button>
    </div>
  </Paper>
);

export default Comments;
