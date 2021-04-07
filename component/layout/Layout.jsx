import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { styles, HeaderContainer, FooterContainer, NavbarContainer } from "/";

const Layout = ({ handleScroll, children, style, pathname }) => (
  <Grid container className={styles.layout} style={style}>
    <Grid item lg={2}>
      <Hidden mdDown>
        <NavbarContainer />
      </Hidden>
    </Grid>
    <Grid item sm={12} md={12} lg={10}>
      <HeaderContainer />
      <div onScroll={handleScroll} className={styles.content}>
        {children}
        {pathname.includes("/chat") ? <div /> : <FooterContainer />}
      </div>
    </Grid>
  </Grid>
);

export default Layout;
