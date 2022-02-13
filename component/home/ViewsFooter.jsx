import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAddOutlined";

import { viewsStyles } from ".";

const ViewsFooter = ({ mobile, date, readTime, keywords, title, author, viewID, bookmarks, bookmarkHandler }) => (
  <div className={viewsStyles.footer}>
    <Typography variant="body2">{`${mobile ? `${date} ·` : `${date} · ${readTime}`} ☆ ${keywords}`}</Typography>

    <IconButton
      aria-label="bookmark"
      onClick={bookmarkHandler({ title, author, viewID })}
      // color={bookmarks.includes(viewID) ? "secondary" : "default"}

      //
    >
      {bookmarks.includes(viewID) ? (
        <BookmarkAddedIcon fontSize="small" color="success" />
      ) : (
        <BookmarkAddIcon fontSize="small" color="success" />
      )}
    </IconButton>
  </div>
);

export default ViewsFooter;
