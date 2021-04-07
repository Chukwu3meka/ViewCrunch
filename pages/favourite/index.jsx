import { ErrorPage } from "@component/page";
import FavouriteContainer from "@component/favourite";
import { fetchAuthorData } from "@utils/firestoreFetch";

const Index = ({ favourites, blacklist, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <FavouriteContainer favourites={favourites} blacklist={blacklist} />;
};

export default Index;

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  const { extractHandle, errorProp, connected } = require("@utils/serverFunctions");
  // const noNetwork = !(await connected);
  // if (noNetwork) return errorProp(400, "Network connectivity issue");

  // const { myAuthorID } = await extractHandle("cookiePedroView", cookie);
  // if (!myAuthorID) return errorProp(400, "User not logged in");

  // const {favourites} = await fetchAuthorData(myAuthorID);
  const favourites = [
    { id: "Sit labore laborum non sit cupidatat amet commodo non occaecat.", title: "Labore id do labore ullamco." },
    {
      id: "Fugiat ea anim cupidatat aliqua nisi.",
      title: "Qui exercitation dolor tempor ut mollit incididunt amet incididunt duis ad laborum.",
    },
    {
      id: "Amet nisi dolor pariatur in amet excepteur labore quis cillum exercitation.",
      title: "Enim adipisicing deserunt ullamco elit aliqua officia incididunt ad tempor ex elit culpa commodo culpa.",
    },
    {
      id: "Cupidatat nostrud sunt anim magna id tempor aute sit do.",
      title: "Eu et ullamco deserunt nulla aliqua ea nulla ullamco amet non exercitation duis ipsum non.",
    },
    {
      id: "Cupidatat nostrud sunt anim magna id tempor aute sit do.0",
      title: "Eu et ullamco deserunt nulla aliqua ea nulla ullamco amet non exercitation duis ipsum non.sa",
    },
    {
      id: "Cupidatat nostrud sunt anim magna id tempor aute sit do1.",
      title: "Eu et ullamco deserunt nulla aliqua ea nulla ullamco amet non exercitation duis ipsum non.wqe",
    },
    {
      id: "Cupidatat nostrud sunt anim magna id tempor aute sit do2.",
      title: "Eu et ullamco deserunt nulla aliqua ea nulla ullamco amet non exercitation duis ipsum non.dfgfd",
    },
    {
      id: "Cupidatat nostrud sunt anim magna id tempor aute sit do3.",
      title: "Eu et ullamco deserunt nulla aliqua ea nulla ullamco amet non exercitation duis ipsum non.sdfgsd",
    },
    {
      id: "Irure nostrud ex labore fugiat id aute cupidatat eiusmod occaecat labore aute.",
      title: "Proident pariatur labore sunt sit proident ex sunt enim cillum duis magna consequat.",
    },
    { id: "Ipsum est voluptate ex sunt.", title: "Eu cupidatat occaecat proident consectetur nostrud labore veniam eiusmod Lorem." },
  ];

  const blacklist = [];

  if (!favourites?.length) return errorProp(400, "Unable to fetch favourites");

  return {
    props: {
      favourites,
      blacklist,
    },
  };
};
