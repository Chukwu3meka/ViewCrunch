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
import Handle from "@component/page/Handle";
import { Loading } from "@component/others";
import userControl from "@utils/userControl";
import LayoutContainer from "@component/layout";
import { fetcher } from "@utils/clientFunctions";
import { setDisplayHeader, setOnlineAction, setProfileAction, setTheme } from "@store/actions";

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
      if (isNaN(profile.myHandle) && profile.myHandle.startsWith("@")) {
        setAppTheme(profile.myTheme);
        store.dispatch(setTheme(profile.myTheme));
        store.dispatch(setProfileAction(profile));
      } else {
        setChooseHandle(true);
      }
    }
  };

  useEffect(() => {
    store.dispatch(setOnlineAction(window.navigator.onLine));
    setOnline(window.navigator.onLine);
  });

  useEffect(() => {
    if (myRefresh && online && !store.getState().profile?.myHandle) persistUser();
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
      <Head>
        <meta charSet="UTF-8" />
        <meta property="type" content="website" />
        <meta content="image/*" property="og:image:type" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* <meta property="fb:app_id" content="404853513844811" /> */}
        <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />

        <meta name="_token" content="" />
        <meta name="csrf_token" content="" />
        <meta name="robots" content="noodp" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#e2ad26" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="msapplication-TileColor" content="#e2ad26" />
        <meta name="msapplication-TileImage" content="/favicon-32x32.png" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
