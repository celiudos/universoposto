import "antd/dist/antd.css";
import type { AppProps } from "next/app";

require("@styles/globals.css");

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
