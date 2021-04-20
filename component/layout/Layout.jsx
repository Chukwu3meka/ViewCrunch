import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { styles, HeaderContainer, Footer, NavbarContainer } from "/";

const Layout = ({ handleScroll, children, style, pathname, scrollRef, scrollTop }) => (
  <Grid container className={styles.layout} style={style}>
    <Grid item lg={2}>
      <Hidden mdDown>
        <NavbarContainer />
      </Hidden>
    </Grid>
    <Grid item sm={12} md={12} lg={10}>
      <HeaderContainer />
      <div onScroll={handleScroll} className={styles.content}>
        <span ref={scrollRef} />
        {children}
        {pathname.includes("/chat") ? <div /> : <Footer scrollTop={scrollTop} />}
      </div>
    </Grid>
  </Grid>
);

export default Layout;
