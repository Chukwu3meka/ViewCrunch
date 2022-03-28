import AuthContainer from "@component/auth/AuthContainer";
import { Box } from "@mui/system";
import errorPageStyles from "./errorPageStyles.module.scss";

const ErrorPage = ({ code = 404, title = "Page not found" }) => (
  <div className={errorPageStyles.errorPage}>
    <div>
      <span>{code}</span>
      <span />
      <span>{title}</span>
    </div>
    <Box mt={1}>{code === 401 && <AuthContainer />}</Box>
  </div>
);

export default ErrorPage;
