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
  grande?: boolean;
  post: IPost;
};

export default function PostVertical({ grande, post }: Props): JSX.Element {
  const imgExibicao = post._imgExibicao;

  return (
    <PostVerticalCss grande={grande || false}>
      {imgExibicao && (
        <LinkPostECat catSlug={post._catId?.slug} postSlug={post.slug}>
          <ImgContainerCss
            style={{ width: grande ? 400 : 300, height: grande ? 200 : 150 }}
          >
            <Image
              layout="fill"
              src={imgExibicao?.[0].url.sm}
              alt={post.titulo}
            />
          </ImgContainerCss>
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
  width: ${(props: { grande: boolean }) => (props.grande ? "400px" : "300px")};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 auto;
`;

const ConteudoCss = styled.div`
  padding: 0 0 30px 0;
`;
