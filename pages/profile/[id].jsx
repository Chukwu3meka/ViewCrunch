import SeoHead from "@component/others/SeoHead";
import ProfileContainer from "@component/profile";
import ErrorPage from "@component/others/ErrorPage";

const ProfilePage = ({ profileData, error: { code, title } }) => {
  if (code) return <ErrorPage code={code} title={title} />;

  return (
    <>
      <SeoHead
        {...{
          seo_title: "ViewCrunch Bookmarks Page",
          seo_description: "ViewsCrunch Bookmarks page. Here you get a list of views you have bookmarked.",
          seo_hashtag: "#ViewCrunch Bookmarks",
          seo_keywords: "viewcrunch bookmarks, viewcrunch, bookmarks",
        }}
      />
      <ProfileContainer profileData={profileData} />
    </>
  );
};

export default ProfilePage;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;
  try {
    const { profile_id } = require("@utils/serverFbQuery");

    const profileData = await profile_id({ cookie: ctx.req.headers.cookie });

    return { props: { error: {}, profileData } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
