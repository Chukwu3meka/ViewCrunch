import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { styles } from ".";
import { Views } from "@component/home";
import { Footer, NavContainer } from "@component/layout";

import Link from "next/link";
// import Fade from "react-reveal/Fade";
// import { styles } from ".";
import { Button } from "@mui/material";
// import { CoverPic, Dialog, Drawer } from "@component/others";
import { shortNumber, trimString } from "@utils/clientFunctions";
// import TransitionGroup from "react-transition-group/TransitionGroup";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   margin: 10,
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const Notification = ({ myCrunches, uiViews, mobile, bookmarkHandler, bookmarks }) => (
  <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
    <NavContainer>
      <div className={styles.nav}>
        <Typography variant="h4">Crunches</Typography>
        <hr />
        <Typography fontSize={15}>Here you find all Crunches you follow, and you can also search for specific crunches.</Typography>
      </div>
    </NavContainer>
    <Grid item xs={12} sm={12} md={8}>
      <div className={styles.myCrunches}>
        <Stack
          //
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          // direction="row"
          // spacing={2}

          justifyContent="flex-start"
          alignItems="flex-start"
          flexWrap="wrap">
          {myCrunches.map(({ title, about, date, stat: { totalFollowers } }, index) => (
            <Paper key={index} className={styles.myCrunch}>
              <div>
                <Typography component="div" variant="body2">{`${shortNumber(totalFollowers)} member${
                  totalFollowers > 1 ? "s" : ""
                } 💗 Created ${date}`}</Typography>
                {/* <CoverPic
                {...{
                  imgSrcA: coverPicture || "/images/ViewCrunch-cover.webp",
                  imgAltA: title || "ViewCrunch cover picture",
                  imgSrcB: primaryPicture || "/images/ViewCrunch.webp",
                  imgAltB: title || "ViewCrunch logo",
                }}
                /> */}
                <Typography component="div" variant="body1" color="textSecondary">
                  {title}
                </Typography>
                <div>{trimString(about, 200)}</div>
              </div>
            </Paper>
          ))}
        </Stack>
      </div>
      <Footer />
    </Grid>
  </Grid>
);

export default Notification;
