import { styles } from "/";
import TerrainIcon from "@material-ui/icons/Terrain";
import { Button, Typography } from "@material-ui/core";

const Loading = ({ loadType, failedText, clickHandler, scrollRef }) => {
  switch (loadType) {
    case "failed":
      return (
        <div className={styles.loadingFailed} ref={scrollRef}>
          <span>
            <TerrainIcon fontSize="large" />
            <Typography variant="h6" align="center">
              Something went wronG
            </Typography>
          </span>
          <Typography variant="body2" color="textSecondary" align="center">
            {failedText}
          </Typography>
          <Button size="small" variant="outlined" fullWidth onClick={clickHandler}>
            Refresh Content
          </Button>
        </div>
      );
    default:
      return (
        <div className={styles.loading}>
          <span className={styles.span1} />
          <span />
          <span />
        </div>
      );
  }
};

export default Loading;
