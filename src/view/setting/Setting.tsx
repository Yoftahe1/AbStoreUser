import { Row, Col, Flex, theme, Select, Divider, Typography } from "antd";

import {
  KeyOutlined,
  MailOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import NameButton from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import Description from "./Description";
import ModalButton from "./PasswordModal";
import useThemeStore from "../../store/Store";
import useUserStore from "../../store/User";
import { Navigate } from "react-router-dom";

import classes from "./setting.module.css"

const { useToken } = theme;
const { Title, Text } = Typography;

const container = {
  height: 40,
  padding: 10,
  fontSize: 15,
  borderRadius: 5,
  border: "1px solid #1677ff",
};

const Setting = () => {
  const changeMode = useThemeStore((state) => state.changeMode);
  const mode = useThemeStore((state) => state.mode);
  const { token } = useToken();
  const user = useUserStore((state) => state.user);
  if (!user) return <Navigate to={"/auth/signin"} />;
  return (
    <div>
      <Title level={4}>Settings</Title>
      <br />
      <div>
        <Flex justify="space-between" align="flex-start">
          <Description
            title="Profile"
            message="personalize your profile"
            icon={<UserOutlined />}
          />

          <div style={{ width: "60%" }} >
            <Row gutter={[16, 16]}>
              <Col span={12} className={classes.profile}>
                <Flex
                  style={{
                    ...container,
                    borderColor: token.colorBorder,
                    backgroundColor: token.colorBgContainer,
                  }}
                  align="center"
                >
                  <Text type="secondary">{user.firstName}</Text>
                </Flex>
              </Col>
              <Col span={12} className={classes.profile}>
                <Flex
                  style={{
                    ...container,
                    borderColor: token.colorBorder,
                    backgroundColor: token.colorBgContainer,
                  }}
                  align="center"
                >
                  <Text type="secondary">{user.lastName}</Text>
                </Flex>
              </Col>
              <Col span={12} className={classes.profile}>
                <Flex
                  style={{
                    ...container,
                    borderColor: token.colorBorder,
                    backgroundColor: token.colorBgContainer,
                  }}
                  align="center"
                >
                  <Text type="secondary">{user.location}</Text>
                </Flex>
              </Col>
              <Col span={12} className={classes.profile}>
                <Flex
                  style={{
                    ...container,
                    borderColor: token.colorBorder,
                    backgroundColor: token.colorBgContainer,
                  }}
                  align="center"
                >
                  <Text type="secondary">+251{user.phoneNumber}</Text>
                </Flex>
              </Col>
              <Col span={12}></Col>
              <Col span={12}>
                <Flex justify="flex-end">
                  <NameButton />
                </Flex>
              </Col>
            </Row>
          </div>
        </Flex>
        <Divider />

        <Flex justify="space-between" align="center" className={classes.email}>
          <Description
            title="Email"
            message="personalize your email address"
            icon={<MailOutlined />}
          />

          <div style={{ width: "60%" }}>
            <Row gutter={[16, 16]}>
              <Col span={12}></Col>
              <Col span={12}>
                <Flex
                  style={{
                    ...container,
                    borderColor: token.colorBorder,
                    backgroundColor: token.colorBgContainer,
                  }}
                  align="center"
                >
                  <Text type="secondary">{user.email}</Text>
                </Flex>
              </Col>
            </Row>
          </div>
        </Flex>

        <Divider className={classes.email}/>
        <Flex justify="space-between" align="center">
          <Description
            title="Password"
            message="personalize your security"
            icon={<KeyOutlined />}
          />
          <ModalButton />
        </Flex>
        <Divider />
        <Flex justify="space-between" align="center">
          <Description
            title="Appearance and Display"
            message="customize how it looks on your device"
            icon={<EditOutlined />}
          />
          <Select
            defaultValue={mode}
            style={{ width: 140 }}
            onChange={(e) => changeMode(e)}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </Flex>
        <Divider />
        <Flex justify="space-between" align="center">
          <Description
            title="Deactivate Your Account"
            message="delete your account permanently"
            icon={<DeleteOutlined />}
          />
          <DeleteModal />
        </Flex>
      </div>
    </div>
  );
};

export default Setting;
