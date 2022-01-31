import Image from "next/image";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { styles } from "/";
import { SocialShare } from "@component/others";
import { NavContainer } from "@component/layout";

const ViewNav = ({ about, twitterHandle, profilePicture, linkedinHandle, facebookHandle, author, displayName, myID, mobile }) => (
  <NavContainer>
    {mobile ? (
      <div />
    ) : (
      <div className={styles.nav} sx={{ display: { md: "none" } }}>
        <div>
          <Image src={profilePicture} layout="fill" alt={displayName} />
        </div>
        <Typography variant="body2">{about}</Typography>
        <div>
          <SocialShare {...{ linkedinHandle, twitterHandle, facebookHandle }} />
        </div>
        {myID !== author ? (
          <Button variant="contained" size="small" color="secondary">
            Follow
          </Button>
        ) : null}
        <div>
          <a href="https://www.soccermass.com">
            <Typography variant="body1">SoccerMASS</Typography>
            <div>
              <Image src="/images/ads/soccermass.webp" layout="fill" />
            </div>
            <Typography variant="body2">
              SoccerMASS is the No 1. Online Football Management Game. Advanced formations and tactics, realistic transfer market and
              much more
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Ads via ViewCrunch
            </Typography>
          </a>
        </div>
      </div>
    )}
  </NavContainer>
);

export default ViewNav;
