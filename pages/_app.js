import { ThemeProvider } from "../context/ThemeContext";
import "../styles/globals.scss";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
