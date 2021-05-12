import { ErrorPage } from "@component/page";
import FavouriteContainer from "@component/favourite";

const Index = ({ favourites, blacklist, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <FavouriteContainer favourites={favourites} blacklist={blacklist} />;
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchProfile } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");

  const { favourite, blacklist } = await fetchProfile(myHandle);
  if (typeof favourite !== "object" && blacklist !== "object") return errorProp(404, "Favourite and Blacklist not found");

  return {
    props: {
      favourite,
      blacklist,
    },
  };
};
