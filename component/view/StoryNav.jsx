import Image from "next/image";
import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

import { toId } from "@utils/clientFunctions";
import { SocialShare, LineText } from "@component/others";

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
}) => (
  <Hidden mdDown>
    <Grid item lg={3}>
      <Paper>
        <div>
          <Image src={profilePicture} layout="fill" />
        </div>
        <Typography component="div" variant="body2">
          {about}
        </Typography>
        <SocialShare {...{ linkedinHandle, twitterHandle, facebookHandle }} />
        <div>
          {featuredPost?.length && (
            <>
              <hr width="120px" />
              <Typography variant="button" color="textSecondary">
                Featured posts
              </Typography>
              {featuredPost.map((title, index) => (
                <Link href={{ pathname: `/@${author}/${title.toLowerCase()}` }} key={index}>
                  <a>~ {title}</a>
                </Link>
              ))}
              <hr width="120px" />
            </>
          )}
        </div>
        <Button variant="contained" size="small" color="secondary">
          Follow me
        </Button>
      </Paper>
      <Paper>
        <a href={advert?.href}>
          <LineText title={advert?.company || "ADVERT"} style />
          <div>
            <Image src={advert?.image || "/images/no-image.webp"} layout="fill" />
          </div>
          <Typography variant="body2">{advert?.description || "Save a space today on our blog and reach more people"}</Typography>
          <Typography variant="caption" color="textSecondary">
            Ads via viewChest
          </Typography>
        </a>
      </Paper>
      {similarPost?.length && (
        <Paper>
          <span>Similar view</span>
          {similarPost.map(({ author, title, pryImage }, index) => (
            <Link href={{ pathname: `/${author}/${toId(title)}` }} key={index}>
              <a>
                <div>
                  <Image src={pryImage || "/images/no-image.webp"} layout="fill" />
                </div>
                <Typography variant="caption">{title || "View title"}</Typography>
              </a>
            </Link>
          ))}
        </Paper>
      )}
    </Grid>
  </Hidden>
);

export default StoryNav;
