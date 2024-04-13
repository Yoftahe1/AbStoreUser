import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { Menu, Button, Flex, MenuProps, Typography } from "antd";

import OrderSidebar from "./OrderSidebar";
import useUserStore from "../store/User";
import abLogo from "../assets/abLogo.svg";

const { Title } = Typography;

const NewHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sign = useUserStore((state) => state.sign);
  const user = useUserStore((state) => state.user);

  const items: MenuProps["items"] = [
    { key: "", label: "Home", style: { width: 90, textAlign: "center" } },
    {
      key: "products",
      label: "Products",
      style: { width: 90, textAlign: "center" },
    },
    {
      key: "orders",
      label: "Orders",
      style: {
        display: user ? "block" : "none",
        width: 90,
        textAlign: "center",
      },
    },
    {
      key: "setting",
      label: "Setting",
      style: {
        display: user ? "block" : "none",
        width: 90,
        textAlign: "center",
      },
    },
  ];

  const handelNavigation: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };

  return (
    <>
      <Flex align="center" justify="center">
        <img src={abLogo} style={{ height: 64 }} />
        <Title
          level={4}
          style={{
            color: "#1677FF",
            margin: 0,
            fontWeight: "bold",
            fontFamily: "serif",
            wordBreak: "keep-all",
          }}
        >
          STORE
        </Title>
      </Flex>
      <Menu
        theme="light"
        mode="horizontal"
        items={items}
        style={{ flex: 1, justifyContent: "center" }}
        defaultSelectedKeys={[pathname.slice(1).split("/")[0]]}
        selectedKeys={[pathname.slice(1).split("/")[0]]}
        onClick={handelNavigation}
      />
      <Flex>
        <OrderSidebar />
        {!user ? (
          <Button
            type="text"
            icon={<LoginOutlined size={17} />}
            onClick={() => navigate("/auth/signin")}
            style={{
              width: 64,
              height: 64,
            }}
          />
        ) : (
          <Button
            icon={<LogoutOutlined />}
            type="text"
            danger
            onClick={() => {
              sign(null);
              localStorage.clear();
              Cookies.remove("token");
            }}
            style={{
              width: 64,
              height: 64,
            }}
          />
        )}
      </Flex>
    </>
  );
};

export default NewHeader;
