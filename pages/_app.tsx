import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { useStore } from "store/storeConfig";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { store, rrfProps } = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps} initializeAuth={false}>
        <Component {...pageProps} />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
