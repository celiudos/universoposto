import { SearchOutlined } from "@ant-design/icons";
import { DisplayFlexSpaceBetween } from "@styles/DisplayFlex";
import { Menu } from "antd";
import Logo from "./Logo";

export default function Navbar(): JSX.Element {
  return (
    <DisplayFlexSpaceBetween>
      <Logo />
      <Menu mode={"horizontal"} defaultSelectedKeys={["sub0"]} theme="light">
        <Menu.Item key="buscar" icon={<SearchOutlined />}>
          Buscar
        </Menu.Item>
        <Menu.Item key="sobre">
          <a href="/sobre" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
    </DisplayFlexSpaceBetween>
  );
}
