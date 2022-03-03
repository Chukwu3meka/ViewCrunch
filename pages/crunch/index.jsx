import SeoHead from "@component/others/SeoHead";
import ErrorPage from "@component/others/ErrorPage";
import CrunchesContainer from "@component/crunch/crunches";
import { dateCalculator, range, toId } from "@utils/clientFunctions";

const BookmarksPage = ({ bookmarks, error: { code, title } }) => {
  if (code) return <ErrorPage statusCode={code} title={title} />;

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
      <CrunchesContainer bookmarks={bookmarks} />;
    </>
  );
};

export default BookmarksPage;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;
  try {
    const { profileFromRefresh } = require("@utils/serverFunctions");

    const profile = await profileFromRefresh({ cookie: ctx.req.headers.cookie });

    const { crunchRef, profileRef } = await require("@utils/firebaseServer");

    const crunches = [];

    for (const crunch of profile.crunches) {
      const crunchID = toId(crunch);

      console.log(crunchID);

      await crunchRef
        .doc(crunchID)
        .get()
        .then(async (snapshot) => {
          const { about, admin, date, follower, moderator, contributor, picture, title, suspended } = snapshot.data();

          // const { profilePicture, profileLink, displayName } = await profileRef
          //   .doc(author)
          //   .get()
          //   .then((snapshot) => {
          //     const {
          //       picture: { profile: profilePicture },
          //       details: { profileLink, displayName },
          //     } = snapshot.data();
          //     return { profilePicture, profileLink, displayName };
          //   });
          // bookmarks.push({
          //   image,
          //   title,
          //   author,
          //   crunch,
          //   content,
          //   readTime,
          //   description,
          //   displayName,
          //   profileLink,
          //   profilePicture,
          //   viewLink: `/view/${viewLink}`,
          //   crunchLink: toId(`/crunch/${crunch}`),
          //   keyword: keywords[range(0, keywords.length - 1)],
          //   viewID: viewLink.split("-")[viewLink.split("-").length - 1],
          //   date: dateCalculator({ date: date.toDate().toDateString() }),
          // });
        });
    }

    return { props: { error: { code: 303 }, crunches } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
