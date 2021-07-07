import IPost from "@data/IPost";
import Img2 from "@public/img/img2.png";
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
  return (
    <PostVerticalCss>
      {comImg && (
        <LinkPostECat catSlug={post.cat?.slug} postSlug={post.slug}>
          <ImgCss>
            <Image layout="fill" src={Img2} alt="Img1" objectFit="fill" />
          </ImgCss>
        </LinkPostECat>
      )}
      <ConteudoCss>
        <LinkPostECat catSlug={post.cat?.slug}>
          <Text type="secondary">{post.cat?.titulo}</Text>
        </LinkPostECat>
        <LinkPostECat catSlug={post.cat?.slug} postSlug={post.slug}>
          <Title level={4}>{post.titulo}</Title>
        </LinkPostECat>
      </ConteudoCss>
    </PostVerticalCss>
  );
}

const PostVerticalCss = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ImgCss = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
`;

const ConteudoCss = styled.div`
  padding: 0 0 30px 0;
`;
