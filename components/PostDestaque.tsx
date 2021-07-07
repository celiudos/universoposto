import IPost from "@data/IPost";
import Img1 from "@public/img/img1.png";
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
  return (
    <PostDestaqueCss>
      <LinkPostECat catSlug={post.cat?.slug} postSlug={post.slug}>
        <ImgCss>
          <Image
            layout="fixed"
            src={Img1}
            alt="Img1"
            height={300}
            width={400}
          />
        </ImgCss>
      </LinkPostECat>
      <ConteudoCss>
        <LinkPostECat catSlug={post.cat?.slug}>
          <Text type="secondary">{post.cat?.titulo}</Text>
        </LinkPostECat>

        <LinkPostECat catSlug={post.cat?.slug} postSlug={post.slug}>
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
