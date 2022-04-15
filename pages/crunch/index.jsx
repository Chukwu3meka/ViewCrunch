import SeoHead from "@component/others/SeoHead";
import ErrorPage from "@component/others/ErrorPage";
import CrunchesContainer from "@component/crunch/crunches";

const CrunchIndex = ({ myCrunches, otherCrunches, error: { code, title } }) => {
  if (code) return <ErrorPage code={code} title={title} />;

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
      <CrunchesContainer myCrunches={myCrunches} otherCrunches={otherCrunches} />
    </>
  );
};

export default CrunchIndex;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;
  try {
    const { dateCalculator, toId } = require("@utils/clientFunctions");
    const { profileFromRefresh } = require("@utils/serverFunctions");

    const profile = (await profileFromRefresh({ cookie: ctx.req.headers.cookie, optional: true })) || {};

    const { crunchRef } = await require("@utils/firebaseServer"),
      { Timestamp } = require("firebase-admin/firestore"),
      otherCrunches = [],
      myCrunches = [],
      crunches = [];

    if (profile.id) {
      for (const crunch of profile.crunches) {
        const crunchID = toId(crunch);
        crunches.push(crunchID);

        await crunchRef
          .doc(crunchID)
          .get()
          .then(async (snapshot) => {
            const {
              about,
              date,
              followers,
              moderators,
              picture,
              suspended,
              title,
              stat: { totalFollowers },
            } = snapshot.data();

            myCrunches.push({
              crunchID,
              about,
              date: dateCalculator({ date: date.toDate().toDateString() }),
              follower: followers?.includes(profile.id),
              moderator: moderators?.includes(profile.id),
              picture,
              suspended,
              title,
              totalFollowers,
            });
          });
      }
    }

    let lastVisible;
    for (let loop = 0; loop < 3; loop++) {
      if (otherCrunches.length >= 5) break;
      await (lastVisible
        ? crunchRef
            .where("suspended", "==", false)
            .orderBy("stat.lastPublished", "desc")
            .startAfter(Timestamp.fromDate(new Date(JSON.parse(lastVisible.date)), lastVisible.title))
            .limit(5)
        : crunchRef.where("suspended", "==", false).orderBy("stat.lastPublished", "desc").limit(7)
      )
        .get()
        .then(async (snapshot) => {
          for (const crunch of snapshot.docs) {
            const crunchID = crunch.id,
              {
                about,
                date,
                followers,
                moderators,
                picture,
                suspended,
                title,
                stat: { totalFollowers },
              } = crunch.data();

            // take only crunches i donot follow
            if (!crunches.includes(crunchID)) {
              lastVisible = { title, date: JSON.stringify(date.toDate()) };
              otherCrunches.push({
                crunchID,
                about,
                date: dateCalculator({ date: date.toDate().toDateString() }),
                follower: followers?.includes(profile.id),
                moderator: moderators?.includes(profile.id),
                picture,
                suspended,
                title,
                totalFollowers,
              });
            }
          }
        });
    }

    return { props: { error: {}, myCrunches, otherCrunches } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
