import Link from "next/link";
import React from "react";

type Props = {
  catSlug?: string;
  postSlug?: string;
  children: React.ReactNode;
};

export default function LinkPostECat({
  catSlug: slugCat,
  postSlug: slugPost,
  children,
}: Props): JSX.Element {
  let href = `/post/${slugCat}`;
  if (slugPost) href += `/${slugPost}`;

  return (
    <Link href={href} passHref>
      <a>{children}</a>
    </Link>
  );
}
