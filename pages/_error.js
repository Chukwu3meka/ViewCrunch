import { ErrorPage } from "@component/page";

const Error = ({ statusCode, title }) => <ErrorPage {...{ statusCode, title }} />;

export default Error;
