import { SearchOutlined } from "@ant-design/icons";
import { Menu } from "antd";

export default function NavBar(): JSX.Element {
  return (
    <Menu>
      <Menu.Item key="buscar" icon={<SearchOutlined />}>
        Buscar
      </Menu.Item>
      <Menu.Item key="sobre">
        <a href="/sobre" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
    </Menu>
  );
}
