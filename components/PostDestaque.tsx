import IPost from "@data/IPost";
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
              layout="fixed"
              src={imgExibicao?.[0].url.md}
              alt={post.titulo}
              height={300}
              width={400}
            />
          </ImgCss>
        </LinkPostECat>
      )}
      <ConteudoCss>
        <LinkPostECat catSlug={post._catId?.slug}>
          <Text type="secondary">{post._catId?.titulo}</Text>
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
`;

const ConteudoCss = styled.div`
  padding: 0 0 0 30px;
`;
