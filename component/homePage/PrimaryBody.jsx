import Link from "next/link";
import Image from "next/image";
import Fade from "react-reveal/Fade";

import { Avatar } from "@component/others";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { trimString, toHref, dateCalculator } from "@utils/clientFunctions";

const PrimaryBody = ({ primaryPost = [], deviceWidth }) =>
  primaryPost.map(({ title, date, author, space, pryImage, displayName, profilePicture }, index) => (
    <Fade left key={index}>
      <Link href={toHref({ author, title })}>
        <a>
          <Paper elevation={2}>
            <div>
              <Image src={pryImage} alt={trimString(title, 100)} layout="fill" />
            </div>
            <div>
              <Typography variant="button" color="textSecondary">
                {space}
              </Typography>
              <Typography variant="h6">{title}</Typography>
              <div>
                <Avatar alt={displayName} src={profilePicture} />
                <span>
                  <Link href={{ pathname: author }}>
                    <Typography variant="caption" color="secondary">{`by ${
                      deviceWidth <= 350 ? trimString(displayName, 15) : displayName
                    }`}</Typography>
                  </Link>
                  <Typography color="textSecondary" variant="subtitle2">
                    {dateCalculator({ date })}
                  </Typography>
                </span>
              </div>
            </div>
          </Paper>
        </a>
      </Link>
    </Fade>
  ));

export default PrimaryBody;
