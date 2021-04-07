import { styles } from "/";
import Fade from "react-reveal/Fade";
import Typography from "@material-ui/core/Typography";

const Linetext = ({ title = "no title", style, number }) => {
  return style ? (
    <div className={styles.lineTextStyle}>
      <Typography variant="h5" component="h2" color="textSecondary">
        {title}
      </Typography>
    </div>
  ) : (
    <Fade top>
      <div className={styles.lineText}>
        <div>
          <Typography variant="h4" component="h1" color="textSecondary">
            {title}
          </Typography>
          {number && (
            <Typography variant="body2" component="i" color="textSecondary">
              {number}
            </Typography>
          )}
        </div>
        <span />
      </div>
    </Fade>
  );
};

export default Linetext;
