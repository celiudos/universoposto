import siteJson from "@data/site.json";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function Logo() {
  return (
    <MainCss>
      <Link href={"/"} passHref>
        <LinkContainerLogoCss>
          <ImgLogoContainerCss>
            <Image
              layout="fill"
              objectFit="cover"
              src={"/logo/logo-v3-sem-seta.png"}
              alt="Logo"
            />
          </ImgLogoContainerCss>
          <ImgSetaContainerCss>
            <Image
              layout="fill"
              objectFit="cover"
              src={"/logo/seta-cima-v2.png"}
              alt="Seta Cima"
            />
          </ImgSetaContainerCss>
          <ImgSetaBaixoContainerCss>
            <Image
              layout="fill"
              objectFit="cover"
              src={"/logo/seta-baixo.png"}
              alt="Seta Baixo"
            />
          </ImgSetaBaixoContainerCss>
          <i>{siteJson.subtitulo}</i>
        </LinkContainerLogoCss>
      </Link>
    </MainCss>
  );
}

const MainCss = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkContainerLogoCss = styled.a`
  position: relative;
  color: #c0bdbd;

  @media only screen and (max-width: 900px) {
    margin: 0 0 50px;
  }
`;

const ImgLogoContainerCss = styled.div`
  position: relative;
  width: 460px;
  height: 60px;

  @media only screen and (max-width: 900px) {
    width: 260px;
    height: 34px;
  }
`;

const ImgSetaContainerCss = styled.div`
  position: absolute;
  opacity: 0;
  width: 25px;
  height: 25px;
  animation-duration: 1s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  /* animation-iteration-count: infinite; */
  animation-name: moveSetaCima;

  left: 230px;
  top: 10px;

  @keyframes moveSetaCima {
    from {
      opacity: 0;
      left: 230px;
      top: 10px;
    }
    to {
      opacity: 1;
      left: 240px;
      top: 0;
    }
  }

  @media only screen and (max-width: 900px) {
    width: 15px;
    height: 15px;
    left: 130px;
    top: 5px;

    @keyframes moveSetaCima {
      from {
        opacity: 0;
        left: 130px;
        top: 5px;
      }
      to {
        opacity: 1;
        left: 135px;
        top: 0;
      }
    }
  }
`;

const ImgSetaBaixoContainerCss = styled(ImgSetaContainerCss)`
  animation-name: moveSetaBaixo;
  left: 250px;
  top: 10px;

  @keyframes moveSetaBaixo {
    from {
      opacity: 0;
      left: 250px;
      top: 10px;
    }
    to {
      opacity: 1;
      left: 240px;
      top: 20px;
    }
  }

  @media only screen and (max-width: 900px) {
    left: 142px;
    top: 5px;

    @keyframes moveSetaBaixo {
      from {
        opacity: 0;
        left: 142px;
        top: 5px;
      }
      to {
        opacity: 1;
        left: 137px;
        top: 10px;
      }
    }
  }
`;
