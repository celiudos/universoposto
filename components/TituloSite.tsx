import { NextSeo } from "next-seo";
import React from "react";

type Props = {
  title: string;
  description: string;
};

export default function TituloSite({ title, description }: Props): JSX.Element {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
          {
            rel: "icon",
            sizes: "32x32",
            href: "/favicon/favicon-32x32.png",
          },
          {
            rel: "icon",
            sizes: "16x16",
            href: "/favicon/favicon-16x16.png",
          },
        ]}
      />
    </>
  );
}
