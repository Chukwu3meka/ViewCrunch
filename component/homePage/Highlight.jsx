import Link from "next/link";
import Image from "next/image";
import Fade from "react-reveal/Fade";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { shortNumber, trimString, toId } from "@utils/clientFunctions";

const Highlight = ({ highlight, styles }) => (
  <div className={styles.highlight}>
    {highlight.map(({ title, pryImage, author, viewers }, index) => (
      <Fade right key={index}>
        <Link href={{ pathname: `/${author}/${toId(title)}` }}>
          <a>
            <Paper elevation={2}>
              <div>
                <span>
                  <VisibilityIcon fontSize="small" color="primary" />
                  <Typography variant="caption" color="textSecondary">
                    {shortNumber(viewers)}
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
