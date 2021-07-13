import IPost from "@data/IPost";
import CoresCategorias from "@styles/CoresCategorias";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import ImgContainerCss from "./ImgContainerCss";
import LinkPostECat from "./LinkPostECat";

type Props = {
  post: IPost;
};

export default function PostDestaque({ post }: Props): JSX.Element {
  const imgExibicao = post._imgExibicao;

  return (
    <PostDestaqueCss>
      {imgExibicao && (
        <LinkPostECat catSlug={post._catId?.slug} postSlug={post.slug}>
          <ImgContainerDestaqueCss>
            <Image
              layout="fill"
              objectFit="cover"
              src={imgExibicao?.[0].url.sm}
              alt={post.titulo}
            />
          </ImgContainerDestaqueCss>
        </LinkPostECat>
      )}
      <ConteudoCss>
        <LinkPostECat catSlug={post._catId?.slug}>
          <Text type="secondary" strong>
            <CoresCategorias catId={post._catId.id}>
              {post._catId?.titulo}
            </CoresCategorias>
          </Text>
        </LinkPostECat>

        <LinkPostECat catSlug={post._catId?.slug} postSlug={post.slug}>
          <Title>{post.titulo}</Title>
          <Text>{post.resumo}</Text>
        </LinkPostECat>
      </ConteudoCss>
    </PostDestaqueCss>
  );
}

const PostDestaqueCss = styled.div`
  display: flex;

  @media only screen and (max-width: 900px) {
    display: inherit;
  }
`;

const ImgContainerDestaqueCss = styled(ImgContainerCss)`
  width: 400px;
  height: 250px;

  @media only screen and (max-width: 900px) {
    margin: 0 auto;
    width: auto;
    height: 179px;
  }
`;

const ConteudoCss = styled.div`
  padding: 0 0 0 30px;

  @media only screen and (max-width: 900px) {
    padding: 0;
  }
`;
