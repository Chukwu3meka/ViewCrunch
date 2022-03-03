import SeoHead from "@component/others/SeoHead";
import ErrorPage from "@component/others/ErrorPage";
import CrunchesContainer from "@component/crunch/crunches";
import { dateCalculator, toId } from "@utils/clientFunctions";

const BookmarksPage = ({ myCrunches, error: { code, title } }) => {
  if (code) return <ErrorPage statusCode={code} title={title} />;

  return (
    <>
      <SeoHead
        {...{
          seo_title: "ViewCrunch Crunches Page",
          seo_description: "ViewsCrunch Crunches page. Here you get a list of views you have bookmarked.",
          seo_hashtag: "#ViewCrunch Crunches",
          seo_keywords: "viewcrunch crunches, viewcrunch, crunches",
        }}
      />
      <CrunchesContainer myCrunches={myCrunches} />;
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

    const myCrunches = [];

    for (const crunch of profile.crunches) {
      const crunchID = toId(crunch);

      await crunchRef
        .doc(crunchID)
        .get()
        .then(async (snapshot) => {
          const { about, contributors, date, followers, moderators, picture, suspended, title, stat } = snapshot.data();

          myCrunches.push({
            about,
            contributor: contributors?.includes(profile.id),
            date: dateCalculator({ date: date.toDate().toDateString() }),
            follower: followers?.includes(profile.id),
            moderator: moderators?.includes(profile.id),
            picture,
            suspended,
            title,
            stat,
          });
        });
    }

    return { props: { error: {}, myCrunches } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
