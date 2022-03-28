// import { ErrorPage } from "@component/page";
// import { PublishContainer } from "@component/crunch";

import ErrorPage from "@component/others/ErrorPage";

const Write = ({
  //
  // crunchDetails,
  error: { code, title },
}) => {
  if (code) return <ErrorPage code={code} title={title} />;

  // const Write = ({ crunch, published, moderator, error }) => {
  //   console.log({ crunch, published, moderator, error });
  return <div>Write</div>;
  // if (error) return <ErrorPage code={error.code} title={error.title} />;
  // return <PublishContainer crunch={crunch} published={published} moderator={moderator} />;
};
export default Write;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;

  try {
    const { dateCalculator, toId } = require("@utils/clientFunctions");
    const { profileFromRefresh } = require("@utils/serverFunctions");

    // const profile = (await profileFromRefresh({ cookie: ctx.req.headers.cookie })) || {};
    const profile = (await profileFromRefresh({})) || {};

    // console.log(profile);

    const { suspended } = profile?.status;

    if (suspended) throw 1007; //check if profile is suspended

    // const published = [],
    //   crunch = ctx.query.id,
    //   { published: publishedArray, roles, crunches } = await fetchProfile(myHandle);

    // if (roles.suspended) return errorProp(401, "Account is suspended, Please, contact ViewCrunch");
    // if (!crunches[crunch]) return errorProp(401, "You're not subscribed to this Crunch");
    // if (!crunches[crunch].publish) return errorProp(401, "Temporarily banned from publishing to this Crunch");

    // if (Object.keys(publishedArray).length !== 0) {
    //   for (const x in publishedArray) {
    //     published.push(publishedArray[x]?.title || "error");
    //   }
    // }

    // return {
    //   props: { crunch, published, moderator: crunches[crunch].moderate },
    // };

    return {
      props: {
        error: {},
        //
        // crunchDetails,
      },
    };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
