import Container from "@styles/Container";
import { DisplayFlexSpaceBetween } from "@styles/DisplayFlex";
import { Menu } from "antd";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar(): JSX.Element {
  return (
    <header>
      <Container>
        <DisplayFlexSpaceBetween>
          <Logo />
          <Menu mode={"horizontal"} theme="light">
            {/* <Menu.Item key="buscar" icon={<SearchOutlined />}>
              Buscar
            </Menu.Item> */}
            <Menu.Item key="sobre">
              <Link href={"/page/sobre"} passHref>
                <a>Sobre</a>
              </Link>
            </Menu.Item>
          </Menu>
        </DisplayFlexSpaceBetween>
      </Container>
    </header>
  );
}
