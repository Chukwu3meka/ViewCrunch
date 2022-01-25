import { layoutStyles, HeaderContainer, Footer } from "/";

const Layout = ({ children, style, scrollRef }) => (
  <div className={layoutStyles.layout} style={style} ref={scrollRef}>
    <HeaderContainer />
    {children}
  </div>
);

export default Layout;
