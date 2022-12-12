// import type { AppProps } from 'next/app'
// import { ReactElement, ReactNode } from 'react';
// import { NextPage } from 'next';
// // import {wrapper} from '../src/store/store'
// // import {Provider} from 'react-redux';

// type NextPageWithLayout = NextPage & {
//   getLayout?: (page: ReactElement) => ReactNode
// }

// type AppPropsWithLayout = AppProps  & {
//   Component: NextPageWithLayout
// }

// function MyApp({ Component, pageProps }: AppPropsWithLayout) {

//   const getLayout = Component.getLayout ?? ((page) => page);

//   return getLayout(<Component {...pageProps} />);
// }

// export default MyApp
import "../styles/index.css";
import "../src/scss/App.scss";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "../src/store/store";

import Layout from "../src/components/layout/Layout";
import { LangContextProvider } from "../src/store/langContext";
import { LoginContextProvider } from "../src/store/loginContext";
import { ThemeContextProvider } from "../src/store/themeContext";
import { SidebarContextProvider } from "../src/store/sidebarContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LangContextProvider>
        <LoginContextProvider>
          <ThemeContextProvider>
            <SidebarContextProvider>
              <Component {...pageProps} />
            </SidebarContextProvider>
          </ThemeContextProvider>
        </LoginContextProvider>
      </LangContextProvider>
    </Provider>
  );
}
