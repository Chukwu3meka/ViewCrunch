import { ErrorPage } from "@component/page";
import NotificationContainer from "@component/notification";

const Index = ({ notification, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <NotificationContainer notification={notification || []} />;
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchProfile } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");

  const { notification } = await fetchProfile(myHandle);
  if (typeof notification !== "object") return errorProp(404, "Favourite and Blacklist not found");

  return {
    props: {
      notification,
    },
  };
};
