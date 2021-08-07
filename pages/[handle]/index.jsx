import validate from "@utils/validator";
import ProfileContainer from "@component/profile";
import { ErrorPage, SeoHead } from "@component/page";

const NavPages = ({ viewerData, myProfile, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return (
    <>
      <SeoHead
        {...{
          seo_title: viewerData.displayName,
          seo_hashtag: `#${viewerData.handle}`,
          seo_quote: viewerData.about,
          seo_image: viewerData.profilePicture,
          seo_keywords: viewerData.social,
          seo_description: `${viewerData.displayName} profile page on viewcrunch`,
        }}
      />
      <ProfileContainer {...{ viewerData, myProfile }} />
    </>
  );
};

export default NavPages;

export const getServerSideProps = async (ctx) => {
  const { fetchProfileData } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp } = require("@utils/serverFunctions");

  console.log("here 1");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  console.log("here 2");
  if (!myHandle) return errorProp(401, "Kindly log in");
  const handle = await validate("handle", ctx.query.handle.toLowerCase());
  console.log("here 3");
  if (!handle) return errorProp(404, "Invalid handle supplied");

  console.log("here 4");
  const { viewerData, error } = await fetchProfileData(handle);
  if (error) return errorProp(402, error);

  console.log("here 5");
  return {
    props: {
      viewerData,
      myProfile: myHandle === handle,
    },
  };
};
