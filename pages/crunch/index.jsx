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
    const { crunch_index } = require("@utils/serverFbQuery");

    const { myCrunches, otherCrunches } = await crunch_index({ cookie: ctx.req.headers.cookie });

    return { props: { error: {}, myCrunches, otherCrunches } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
