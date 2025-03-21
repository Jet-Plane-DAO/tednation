import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

import { config } from "@fortawesome/fontawesome-svg-core";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingState } from "../components/shared/LoadingState";
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const theme = "cyberpunk";
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
  }, [theme]);
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingState />} persistor={persistor}>
        <MeshProvider>
          <Component {...pageProps} />
        </MeshProvider>
      </PersistGate>
    </Provider>
  );
}
