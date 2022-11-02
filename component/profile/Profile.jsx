import { Grid, Typography, Box } from "@mui/material";
import { Footer, NavContainer } from "@component/layout";
import { ProfilePicture } from ".";

const Profile = ({ profileData }) => {
  return (
    <Grid container style={{ maxWidth: "2200px", margin: "auto" }}>
      <NavContainer>
        <div>
          <Typography variant="h4">Author Profile</Typography>
          <hr />
          <Typography fontSize={15}>
            Profile pages are accessible to the public. A Profile page provides information about the author/owner of the account
          </Typography>
        </div>
      </NavContainer>

      <Grid item xs={12} sm={12} md={8}>
        <Box></Box>
        <ProfilePicture profileData={profileData} />

        <Footer />
      </Grid>
    </Grid>
  );
};

export default Profile;
