import Image from "next/image";
import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

import { NavContainer } from "@component/layout";

import { styles } from "/";
import { SocialShare } from "@component/others";

const ViewNav = ({ about, twitterHandle, profilePicture, linkedinHandle, facebookHandle, displayName, myDisplayName }) => (
  <NavContainer>
    <Paper className={styles.nav} sx={{ display: { md: "none" } }}>
      <div>
        <Image src={profilePicture} layout="fill" alt={displayName} />
      </div>
      <Typography variant="body2">{about}</Typography>
      <div>
        <SocialShare {...{ linkedinHandle, twitterHandle, facebookHandle }} />
      </div>
      {myDisplayName !== displayName ? (
        <Button variant="contained" size="small" color="secondary">
          Follow me
        </Button>
      ) : null}
      <div>
        <a href="https://www.soccermass.com">
          <Typography variant="body1">SoccerMASS</Typography>
          <div>
            <Image src="/images/ads/soccermass.webp" layout="fill" />
          </div>
          <Typography variant="body2">Online Soccer Manager</Typography>
          <Typography variant="caption" color="textSecondary">
            Ads via ViewCrunch
          </Typography>
        </a>
      </div>
    </Paper>
  </NavContainer>
);

export default ViewNav;
