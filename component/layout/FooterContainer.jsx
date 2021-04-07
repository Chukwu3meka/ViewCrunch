import { Footer } from "/";
import { connect } from "react-redux";

const FooterContainer = () => {
  return <Footer />;
};

const mapStateToProps = (state) => ({}),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
