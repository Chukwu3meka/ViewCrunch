import Link from "next/link";
import Image from "next/image";
import Fade from "react-reveal/Fade";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import UpvoteIcon from "@material-ui/icons/ThumbUp";
import { shortNumber, trimString } from "@utils/clientFunctions";

const Highlight = ({ highlight, styles }) => (
  <div className={styles.highlight}>
    {highlight.map(({ title, pryImage, path, upvote }, index) => (
      <Fade right key={index}>
        {/* <Link href={{ pathname: `/${author}/${toId(title)}` }}> */}
        <Link href={path}>
          <a>
            <Paper elevation={2}>
              <div>
                <span>
                  <UpvoteIcon fontSize="small" color="primary" />
                  <Typography variant="caption" color="textSecondary">
                    {shortNumber(upvote)}
                  </Typography>
                </span>
                <Typography variant="body1">{trimString(title, 20)}</Typography>
              </div>
              <div>
                <Image src={pryImage} alt={title} layout="fill" />
              </div>
            </Paper>
          </a>
        </Link>
      </Fade>
    ))}
  </div>
);

export default Highlight;
