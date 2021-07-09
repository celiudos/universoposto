import IPost from "@data/IPost";
import CoresCategorias from "@styles/CoresCategorias";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import LinkPostECat from "./LinkPostECat";

type Props = {
  comImg?: boolean;
  post: IPost;
};

export default function PostVertical({ comImg, post }: Props): JSX.Element {
  const imgExibicao = post._imgExibicao;

  return (
    <PostVerticalCss>
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
          <Title level={4}>{post.titulo}</Title>
        </LinkPostECat>
      </ConteudoCss>
    </PostVerticalCss>
  );
}

const PostVerticalCss = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ImgCss = styled.div`
  width: 300px;
  height: 150px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const ConteudoCss = styled.div`
  padding: 0 0 30px 0;
`;
