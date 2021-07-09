import { useStore } from "@store/storeConfig";
import "@styles/global.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
