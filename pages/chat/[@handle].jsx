// import { ErrorPage } from "@component/others";
import { fetchProfileData } from "@utils/firestoreFetch";
// import ProfileContainer from "@component/profile/index.js";

import { useRouter } from "next/router";
// import NavPageContainer from "@component/navPage";
// import { fetchViews, fetchAuthorData } from "@utils/firestoreFetch";

const NavPages = ({ articles, propsLastVisible, propsArticlesRead, navTag, error }) => {
  // if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  // return <ProfileContainer {...{ authorData, articles, authorHistory, myProfile }} />;

  const router = useRouter();
  const { "@handle": handle = "not-logged-in" } = router.query;

  console.log(handle);
  if (!handle?.startsWith("@")) return "invalid user";
  return `hey ${handle}`;

  // return <NavPageContainer {...{ articles, propsLastVisible, propsArticlesRead, navTag }} />;
};

export default NavPages;
