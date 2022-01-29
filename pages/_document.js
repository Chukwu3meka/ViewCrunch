import React from "react";
import { ServerStyleSheets } from "@mui/styles";
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

          <link
            href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&amp;family=Playfair+Display&amp;display=swap"
            rel="stylesheet"
          />

          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`} defer />
          <Script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA}', {
              page_path: window.location.pathname,
            });
          `,
            }}
            defer
          />
          <Script
            async
            defer
            nonce="pJttRA02"
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v11.0&amp;appId=332276848078020&amp;autoLogAppEvents=1"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="fb-root" />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = (await Document.getInitialProps(ctx)) || null;

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
