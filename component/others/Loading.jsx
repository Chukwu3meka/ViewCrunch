import { styles } from "/";

import Button from "@material-ui/core/Button";
import TerrainIcon from "@material-ui/icons/Terrain";
import Typography from "@material-ui/core/Typography";

const Loading = ({ loadType, failedText, clickHandler }) => {
  switch (loadType) {
    case "failed":
      return (
        <div className={styles.loadingFailed}>
          <span>
            <TerrainIcon fontSize="large" />
            <Typography variant="h6">Something went wronG</Typography>
          </span>
          <Typography variant="body2" color="textSecondary" align="center">
            {failedText}
          </Typography>
          <Button size="small" variant="contained" color="primary" onClick={clickHandler}>
            Refresh Page
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
