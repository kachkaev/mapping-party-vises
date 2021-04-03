import { AppProps } from "next/app";
import * as React from "react";

import { PageLayout } from "../ui/PageLayout";

const App: React.VoidFunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  React.useEffect(() => {
    document.body.className = (document.body.className ?? "").replace(
      "no-js",
      "js",
    );
  }, []);

  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
};

export default App;
