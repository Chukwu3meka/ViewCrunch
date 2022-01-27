import Image from "next/image";
import Link from "next/link";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";

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
