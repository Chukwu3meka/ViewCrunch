import Image from "next/image";
import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

import { styles } from "/";
import { SocialShare, LineText } from "@component/others";
import profile from "@store/reducers/profile";

const StoryNav = ({
  author,
  advert,
  similarPost,
  about,
  featuredPost,
  twitterHandle,
  profilePicture,
  linkedinHandle,
  facebookHandle,
  profile,
}) => (
  <Hidden mdDown>
    <Grid item lg={3} className={styles.storyNav}>
      <Paper>
        <div>
          <Image src={profilePicture} layout="fill" />
        </div>
        <Typography component="div" variant="body2">
          {about}
        </Typography>
        <SocialShare {...{ linkedinHandle, twitterHandle, facebookHandle }} />
        <div>
          {featuredPost?.length ? (
            <>
              <hr width="120px" />
              <Typography variant="button" color="textSecondary">
                Featured posts
              </Typography>
              {featuredPost.map(({ title, id }) => (
                // <Link href={{ pathname: `/${author}/${id}` }} key={id}>
                <Link href={id} key={id}>
                  <a>~ {title}</a>
                </Link>
              ))}
              <hr width="120px" />
            </>
          ) : (
            ""
          )}
        </div>
        {profile.myHandle !== author ? (
          <Button variant="contained" size="small" color="secondary">
            Follow me
          </Button>
        ) : (
          ""
        )}{" "}
      </Paper>
      <Paper>
        <a href={advert?.href}>
          <LineText title={advert?.company || "ADVERT"} style />
          <div>
            <Image src={advert?.image || "/images/no-image.webp"} layout="fill" />
          </div>
          <Typography variant="body2">{advert?.description || "Save a crunch today on our blog and reach more people"}</Typography>
          <Typography variant="caption" color="textSecondary">
            Ads via ViewCrunch
          </Typography>
        </a>
      </Paper>
      {similarPost?.length ? (
        <Paper>
          <span>Similar view</span>
          {
            // console.log(similarPost)
            similarPost.map(({ author, title, pryImage, id }, index) => (
              // <Link href={{ pathname: `/${author}/${id}` }} key={index}>
              <Link href={{ pathname: `${id}` }} key={index}>
                <a>
                  <div>
                    <Image src={pryImage || "/images/no-image.webp"} layout="fill" />
                  </div>
                  <Typography variant="caption">{title || "View title"}</Typography>
                </a>
              </Link>
            ))
          }
        </Paper>
      ) : (
        ""
      )}
    </Grid>
  </Hidden>
);

export default StoryNav;
