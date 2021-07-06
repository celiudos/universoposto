import { SearchOutlined } from "@ant-design/icons";
import Container from "@styles/Container";
import { DisplayFlexSpaceBetween } from "@styles/DisplayFlex";
import { Menu } from "antd";
import Logo from "./Logo";

export default function Navbar(): JSX.Element {
  return (
    <header>
      <Container>
        <DisplayFlexSpaceBetween>
          <Logo />
          <Menu mode={"horizontal"} theme="light">
            <Menu.Item key="buscar" icon={<SearchOutlined />}>
              Buscar
            </Menu.Item>
            <Menu.Item key="sobre">
              <a href="/sobre" target="_blank" rel="noopener noreferrer">
                Sobre
              </a>
            </Menu.Item>
          </Menu>
        </DisplayFlexSpaceBetween>
      </Container>
    </header>
  );
}
