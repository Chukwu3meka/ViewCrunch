import { styles } from "/";
import { Avatar } from "@component/others";

import Pagination from "@material-ui/lab/Pagination";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const Members = ({ setDisplayMembers, title, listChunk, list, chunkSize, page, setPage, activeSpace, followHandler }) => {
  return (
    <div className={styles.members}>
      <IconButton aria-label="close" color="inherit" onClick={() => setDisplayMembers(false)}>
        <HighlightOffIcon fontSize="inherit" />
      </IconButton>
      <Typography variant="h6">{title}</Typography>
      <div>
        {listChunk.map(({ displayName, profilePicture, handle }, index) => (
          <div key={index}>
            <span>
              <Avatar alt={displayName} src={profilePicture} size="small" pathname={`/${handle}`} />
              <Typography variant="body2">{displayName}</Typography>
            </span>
            <IconButton
              aria-label="send follow request"
              onClick={followHandler({ follow: !activeSpace?.myFollowing?.includes(handle), viewer: handle })}>
              <PersonAddIcon fontSize="small" color={activeSpace?.myFollowing?.includes(handle) ? "secondary" : "inherit"} />
            </IconButton>
          </div>
        ))}
      </div>
      <br />
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        count={Math.ceil(list.length / chunkSize)}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </div>
  );
};

export default Members;
