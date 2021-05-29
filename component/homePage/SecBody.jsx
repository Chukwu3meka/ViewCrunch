import React from "react";
import { styles } from "/";
import Link from "next/link";
import Image from "next/image";
import Fade from "react-reveal/Fade";
import { Loading, Avatar } from "@component/others";
import { Grid, Paper, Typography } from "@material-ui/core";
import { shortNumber, trimString, toId } from "@utils/clientFunctions";

const SecBody = ({ secondary, deviceWidth, loading, getMorePost, fetchFailed, scrollRef }) => (
  <Grid container alignItems="center">
    <Grid item xs={12} sm={12} className={styles.secBody}>
      {secondary.map(({ crunch, content, title, author, pryImage, displayName, profilePicture, upvote, path }, index) => (
        <Fade bottom key={index}>
          {/* <Link href={`/${author}/${toId(title)}`}> */}
          <Link href={path}>
            <a>
              <Paper>
                <div>
                  <Typography variant="button" color="textSecondary">
                    {title}
                  </Typography>
                  <article dangerouslySetInnerHTML={{ __html: content.replace(/<[^>]+>/g, "") }} />
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
                        {`${shortNumber(upvote)} upvote${upvote > 1 ? "s" : ""}
                        | ${deviceWidth <= 600 ? trimString(crunch, 9) : crunch}`}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div>
                  <Image src={pryImage} alt={title} layout="fill" />
                </div>
              </Paper>
            </a>
          </Link>
        </Fade>
      ))}
      {loading && <Loading status={loading} />}
      {fetchFailed && (
        <Loading
          scrollRef={scrollRef}
          loadType="failed"
          failedText="We are unable to find new articles for you; Please, refresh the page or click the button below."
          clickHandler={getMorePost}
        />
      )}
    </Grid>
  </Grid>
);

export default SecBody;
