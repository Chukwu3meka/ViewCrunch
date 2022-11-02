import { Grid, Box, Typography } from "@mui/material";

import { styles } from ".";
import { NavContainer } from "@component/layout";
import AuthContainer from "@component/auth/AuthContainer";
import errorPageStyles from "./errorPageStyles.module.scss";

const ErrorPage = ({ code = 404, title = "Page not found" }) => (
  <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
    <NavContainer>
      <div className={styles.nav}>
        <Typography variant="h4">Error Occurred</Typography>
        <hr />
        <Typography fontSize={15}>The page you've requested could not be fetched.</Typography>
      </div>
    </NavContainer>
    <Grid item xs={12} sm={12} md={8}>
      <div className={errorPageStyles.errorPage}>
        <div>
          <span>{code}</span>
          <span />
          <span>{title}</span>
        </div>
        <Box mt={1}>{code === 401 && <AuthContainer />}</Box>
      </div>
    </Grid>
  </Grid>
);

export default ErrorPage;
