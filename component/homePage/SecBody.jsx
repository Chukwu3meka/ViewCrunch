import { styles } from "/";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Fade from "react-reveal/Fade";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import UpvoteIcon from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import { Loading, LineText, Avatar } from "@component/others";
import { shortNumber, trimString, htmlToString, toId } from "@utils/clientFunctions";

const SecBody = ({ content = [], deviceWidth, label, loading, getMorePost, fetchFailed }) => (
  <Grid container alignItems="center">
    <Grid item xs={12} sm={12} className={styles.secBody}>
      <LineText style title={label || "Recent View"} />

      {content.map(({ space, content, title, author, pryImage, displayName, profilePicture, upvote }, index) => (
        <Fade bottom key={index}>
          <Link href={`/${author}/${toId(title)}`}>
            <a>
              <Paper>
                <div>
                  <div>
                    <Image src={pryImage} alt={title} layout="fill" />
                  </div>
                </div>
                <div>
                  <Typography variant="button" color="textSecondary">
                    {title}
                  </Typography>
                  <article dangerouslySetInnerHTML={{ __html: htmlToString(content) }} />
                  <div>
                    <div>
                      <Avatar alt={displayName} src={profilePicture} size="small" />
                      <Typography variant="body2" color="textSecondary">
                        {deviceWidth <= 350
                          ? trimString(displayName, 10)
                          : deviceWidth <= 600
                          ? trimString(displayName, 13)
                          : displayName}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption" color="textSecondary">
                        {`${shortNumber(upvote)} upvote${upvote > 1 && "s"}
                        | ${deviceWidth <= 350 ? trimString(space, 8) : deviceWidth <= 600 ? trimString(space, 10) : space}`}
                      </Typography>
                    </div>
                  </div>
                </div>
              </Paper>
            </a>
          </Link>
        </Fade>
      ))}

      {loading && <Loading status={loading} />}
      {fetchFailed && (
        <Loading
          loadType="failed"
          failedText="We are unable to find new articles for you; Please, refresh the page or click the button below."
          clickHandler={getMorePost}
        />
      )}
    </Grid>
  </Grid>
);

export default SecBody;
