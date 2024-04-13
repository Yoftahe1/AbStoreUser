import { ReactNode } from "react";

import { Layout, theme } from "antd";

import NewFooter from "../components/NewFooter";
import NewHeader from "../components/NewHeader";

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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 2,
          backgroundColor: token.colorBgContainer,
          borderBottom: "1px solid #fff",
          borderBottomColor: token.colorBorderSecondary,
        }}
      >
        <NewHeader />
      </Header>
      <Layout>
        <Content style={{ padding: "0 48px" }}>
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
