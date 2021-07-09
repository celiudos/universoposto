import IPost from "@data/IPost";
import CoresCategorias from "@styles/CoresCategorias";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
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
          <ImgCss>
            <Image
              layout="fill"
              src={imgExibicao?.[0].url.sm}
              alt={post.titulo}
            />
          </ImgCss>
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
  /* width: 800px; */
`;

const ImgCss = styled.div`
  width: 400px;
  height: 250px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const ConteudoCss = styled.div`
  padding: 0 0 0 30px;
`;
