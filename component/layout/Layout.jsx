import { Loading } from "@component/others";
import { layoutStyles, HeaderContainer } from "/";

const Layout = ({ children, style, scrollRef, pageReady }) => (
  <div className={layoutStyles.layout} style={style} ref={scrollRef}>
    <HeaderContainer />
    {pageReady ? (
      children
    ) : (
      <div style={{ height: "calc(100vh - 50px)" }}>
        <Loading />
      </div>
    )}
  </div>
);

export default Layout;
