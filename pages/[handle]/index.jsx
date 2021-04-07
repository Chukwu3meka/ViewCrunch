import validate from "@utils/validator";
import { ErrorPage } from "@component/page";
import ProfileContainer from "@component/profile";

const NavPages = ({ viewerData, viewerHistory, myProfile, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return <ProfileContainer {...{ viewerData, viewerHistory, myProfile }} />;
};

export default NavPages;

export const getServerSideProps = async (ctx) => {
  const { fetchProfileData } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");
  const handle = await validate("handle", ctx.query.handle.toLowerCase());

  if (!handle) return errorProp(404, "Invalid handle provided");

  const { viewerData, viewerHistory, error = false } = await fetchProfileData(handle);
  if (error) return errorProp();

  return {
    props: {
      myProfile: myHandle === handle,

      viewerData,
      viewerHistory,
    },
  };
};
