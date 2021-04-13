import Head from "next/head";
import * as React from "react";

export const PageMetadata: React.VoidFunctionComponent<{
  title?: string;
  description?: string;
}> = ({
  title = "mapping party vises",
  description = "Misc vis sketches for OpenStreetMap mapping parties",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
