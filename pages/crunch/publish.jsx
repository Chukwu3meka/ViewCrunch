import PublishContainer from "@component/crunch/publish";

import ErrorPage from "@component/others/ErrorPage";

const Publish = ({ crunches, displayName, error: { code, title } }) => {
  if (code) return <ErrorPage code={code} title={title} />;

  return (
    <>
      {/* SEO page */}
      <PublishContainer crunches={crunches} displayName={displayName} />
    </>
  );
};
export default Publish;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;

  try {
    const { profileFromRefresh } = require("@utils/serverFunctions");

    const profile = (await profileFromRefresh({ cookie: ctx.req.headers.cookie })) || {};

    // const {
    //   crunches,
    //   status: { suspended },
    //   details: { displayName },
    // } = profile;

    // if (suspended) throw 1007; //check if profile is suspended

    // return { props: { error: {}, crunches, displayName } };
    return { props: { error: {}, crunches: [] } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
