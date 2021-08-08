import Head from "next/head";
import Router from "next/router";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import config from "react-reveal/globals";
import { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import * as gtag from "@utils/gtag";
import muiTheme from "@source/theme";
import { useStore } from "@store/index";
import validate from "@utils/validator";
import { SeoHead } from "@component/page";
import Handle from "@component/page/Handle";
import { Loading } from "@component/others";
import userControl from "@utils/userControl";
import LayoutContainer from "@component/layout";
import { fetcher } from "@utils/clientFunctions";
import { setDisplayHeader, setOnlineAction, setProfileAction } from "@store/actions";

const App = ({ Component, pageProps }) => {
  config({ ssrFadeout: true });
  const store = useStore(pageProps.initialReduxState),
    { myRefresh } = userControl(),
    [online, setOnline] = useState(true),
    [pageReady, setPageReady] = useState(false),
    [appTheme, setAppTheme] = useState("light"),
    [chooseHandle, setChooseHandle] = useState(false);

  const persistUser = async () => {
    const profile = await fetcher("/api/profile/verifyToken", JSON.stringify({ myRefresh }));

    if (profile?.myHandle) {
      if (validate("handle", profile?.myHandle)) {
        setAppTheme(profile.myTheme);
        store.dispatch(setProfileAction(profile));
      }
      if (!isNaN(profile?.myHandle)) {
        store.dispatch(setProfileAction({}));
        setChooseHandle(true);
      }
    } else {
      store.dispatch(setProfileAction({}));
    }
  };

  useEffect(() => {
    store.dispatch(setOnlineAction(window.navigator.onLine));
    setOnline(window.navigator.onLine);
  });

  useEffect(() => {
    if (myRefresh && online) persistUser();
  }, [myRefresh]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setPageReady(true);

      const jssStyles = document.querySelector("#jss-server-side");
      if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);

      Router.events.on("routeChangeStart", () => setPageReady(false));

      Router.events.on("routeChangeComplete", async (url) => {
        gtag.pageview(url);
        store.dispatch(setDisplayHeader("visible"));
        setPageReady(true);
      });

      Router.events.on("routeChangeError", () => {
        setPageReady(true);
      });
    }

    return () => {
      mounted = false;
      Router.events.off("routeChangeComplete", (url) => gtag.pageview(url));
    };
  }, []);

  return (
    <>
      <SeoHead />

      <Head>
        <meta charSet="UTF-8" />
        <meta content="image/*" property="og:image:type" />

        <meta property="type" content="website" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="180" />
        {/* <meta property="og:image:width" content="1080" />
      <meta property="og:image:height" content="1080" /> */}
        <meta property="og:site_name" content="ViewCrunch" />
        <meta property="fb:app_id" content="332276848078020" />
        <meta property="og:url" content="https://www.facebook.com/viewcrunch/" key="og:url" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />

        <meta name="_token" content="" />
        <meta name="csrf_token" content="" />
        <meta name="theme-color" content="#e2ad26" />
        <meta name="robots" content="index, follow" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />

        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
      </Head>

      <ThemeProvider theme={muiTheme(appTheme)}>
        <CssBaseline />
        <Provider store={store}>
          <SnackbarProvider maxSnack={1} preventDuplicate>
            <LayoutContainer setAppTheme={setAppTheme}>
              {pageReady ? <Component {...pageProps} /> : <Loading />}
              {chooseHandle && <Handle myRefresh={myRefresh} />}
            </LayoutContainer>
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
