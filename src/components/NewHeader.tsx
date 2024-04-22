import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LogoutOutlined,
  LoginOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Menu, Button, Flex, MenuProps, Typography, Drawer } from "antd";

import OrderSidebar from "./OrderSidebar";
import useUserStore from "../store/User";
import abLogo from "../assets/abLogo.svg";
import { useState } from "react";
import classes from "./newHeader.module.css";

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
      <Flex className={classes.mobile}>
        <Sidebar />
      </Flex>
      <Flex align="center" justify="center">
        <img src={abLogo} style={{ height: 64 }} />
        <Title
          level={4}
          style={{
            color: "#1677FF",
            margin: 0,
            fontWeight: "bold",
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
        className={classes.desktop}
        style={{ flex: 1, justifyContent: "center" }}
        defaultSelectedKeys={[pathname.slice(1).split("/")[0]]}
        selectedKeys={[pathname.slice(1).split("/")[0]]}
        onClick={handelNavigation}
      />
      <Flex>
        <OrderSidebar />
        <div className={classes.desktop}>
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
        </div>
      </Flex>
    </>
  );
};

export default NewHeader;

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const sign = useUserStore((state) => state.sign);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items: MenuProps["items"] = [
    { key: "", label: "Home", style: { textAlign: "center" } },
    {
      key: "products",
      label: "Products",
      style: { textAlign: "center" },
    },
    {
      key: "orders",
      label: "Orders",
      style: {
        display: user ? "block" : "none",
        textAlign: "center",
      },
    },
    {
      key: "setting",
      label: "Setting",
      style: {
        display: user ? "block" : "none",
        textAlign: "center",
      },
    },
    {
      key: "auth/signin",
      label: "Sign-In",
      style: {
        display: user ? "none" : "block",
        textAlign: "center",
      },
    },
    {
      key: "logout",
      label: "Logout",
      style: {
        display: user ? "block" : "none",
        textAlign: "center",
      },
    },
  ];

  const handelNavigation: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      sign(null);
      localStorage.clear();
      Cookies.remove("token");
    }
    else navigate(`/${e.key}`);
    setOpen(false);
  };

  return (
    <>
      <Button
        type="text"
        icon={
          <MenuUnfoldOutlined
            style={{
              fontSize: 17,
            }}
          />
        }
        onClick={() => setOpen(true)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu
          items={items}
          theme="light"
          mode="vertical"
          defaultSelectedKeys={[pathname.slice(1).split("/")[0]]}
          selectedKeys={[pathname.slice(1).split("/")[0]]}
          onClick={handelNavigation}
          style={{background:"transparent",border:0}}
        />
      </Drawer>
    </>
  );
};
