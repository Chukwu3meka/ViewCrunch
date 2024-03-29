import Head from "next/head";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import config from "react-reveal/globals";
import { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";

import { useStore } from "@store/index";
import SeoHead from "@component/others/SeoHead";

import LayoutContainer from "@component/layout";
import { setDisplayHeader, setOnlineAction } from "@store/actions";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "@source/theme";
import createEmotionCache from "@source/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  config({ ssrFadeout: true });
  const store = useStore(pageProps.initialReduxState),
    [appTheme, setAppTheme] = useState("light");

  useEffect(() => {
    window.addEventListener("offline", store.dispatch(setOnlineAction(window.navigator.onLine)));
    window.addEventListener("online", store.dispatch(setOnlineAction(window.navigator.onLine)));
    return () => {
      window.removeEventListener("offline", store.dispatch(setOnlineAction(window.navigator.onLine)));
      window.removeEventListener("online", store.dispatch(setOnlineAction(window.navigator.onLine)));
    };
  });

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
    // let mounted = true;
    // if (mounted) {

    //   Router.events.on("routeChangeStart", () => setPageReady(false));

    //   Router.events.on("routeChangeComplete", async (url) => {
    //     // gtag.pageview(url);
    //     store.dispatch(setDisplayHeader("visible"));
    //     setPageReady(true);
    //   });

    //   Router.events.on("routeChangeError", () => {
    //     setPageReady(true);
    //   });
    //   setPageReady(true);
    // }

    // return () => {
    //   mounted = false;
    //   setPageReady(true);
    //   Router.events.off("routeChangeComplete", (url) => gtag.pageview(url));
    // };
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="UTF-8" />
        <meta content="image/*" property="og:image:type" />

        <meta property="type" content="website" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="180" />
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
        <meta name="viewport" content="initial-scale=1, width=device-width" />
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

      <SeoHead />

      <ThemeProvider theme={theme(appTheme)}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          <SnackbarProvider maxSnack={1} preventDuplicate>
            <LayoutContainer setAppTheme={setAppTheme}>
              <Component {...pageProps} />
            </LayoutContainer>
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
