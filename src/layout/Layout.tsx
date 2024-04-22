import { ReactNode } from "react";

import { Layout, theme } from "antd";

import NewFooter from "../components/NewFooter";
import NewHeader from "../components/NewHeader";

import classes from "./layout.module.css";

const { useToken } = theme;
const { Header, Content } = Layout;

interface IProps {
  children: ReactNode;
}

const AppLayout = ({ children }: IProps) => {
  const { token } = useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          backgroundColor: token.colorBgContainer,
          borderBottomColor: token.colorBorderSecondary,
        }}
        className={classes.header}
      >
        <NewHeader />
      </Header>
      <Layout>
        <Content className={classes.content}>
          <br />
          {children}
        </Content>
      </Layout>
      <br />
      <br />
      <NewFooter />
    </Layout>
  );
};

export default AppLayout;
