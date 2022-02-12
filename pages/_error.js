import ErrorPage from "@component/others/ErrorPage";

const Error = ({ statusCode, title }) => <ErrorPage {...{ statusCode, title }} />;

export default Error;
