import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAddOutlined";

import { viewsStyles } from ".";

const ViewsFooter = ({ mobile, date, readTime, keywords, title, author, viewID, bookmarks, bookmarkHandler }) => (
  <div className={viewsStyles.footer}>
    {viewID}
    <Typography variant="body2">{`${mobile ? `${date} ·` : `${date} · ${readTime}`} ☆ ${keywords}`}</Typography>

    <IconButton
      color="secondary"
      aria-label="bookmark"
      onClick={bookmarkHandler({ title, author, viewID })}
      color={bookmarks.includes(viewID) ? "secondary" : "default"}>
      <BookmarkAddIcon fontSize="small" />
    </IconButton>
  </div>
);

export default ViewsFooter;
