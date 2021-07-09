import siteData from "@data/site.json";
import { NextSeo } from "next-seo";
import React from "react";

type Props = {
  title?: string;
  description?: string;
  urlImg?: string;
};

export default function NextSeoHeader({
  title,
  description,
  urlImg,
}: Props): JSX.Element {
  const titleFinal = title ? `${title} - ${siteData.titulo}` : siteData.titulo;
  const urlImgFinal = urlImg ? urlImg : `${siteData.url}/logo/logo-grande.png`;

  return (
    <>
      <NextSeo
        title={titleFinal}
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
        openGraph={{
          type: "website",
          url: siteData.url,
          title: titleFinal,
          description: description,
          images: [
            {
              url: urlImgFinal,
              width: 180,
              height: 180,
              alt: titleFinal,
            },
          ],
        }}
      />
    </>
  );
}
