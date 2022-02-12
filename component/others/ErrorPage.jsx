import errorPageStyles from "./errorPageStyles.module.scss";

const ErrorPage = ({ statusCode = 404, title = "Page not found" }) => (
  <div className={errorPageStyles.errorPage}>
    <span>{statusCode}</span>
    <span />
    <span>{title}</span>
  </div>
);

export default ErrorPage;
