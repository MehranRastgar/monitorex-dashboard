import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      {/* <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      ></meta> */}
      <meta name="mobile-web-app-capable" content="yes"></meta>
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      ></meta>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <meta name="theme-color" content="#317EFB" />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* <title>بلاگ-پایتخت</title> */}
      </Head>

      <body title="shopsoo">
        {/* <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript> */}

        <div id="page-transition"></div>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
