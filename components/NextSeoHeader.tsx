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
  const descriptionFinal = description ? description : siteData.subtitulo;
  const urlImgFinal = urlImg ? urlImg : `${siteData.url}/logo/logo-180_180.png`;

  return (
    <>
      <NextSeo
        title={titleFinal}
        description={descriptionFinal}
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
          description: descriptionFinal,
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
