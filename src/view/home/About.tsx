import {
  CarOutlined,
  CustomerServiceOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Flex, List, Typography, theme } from "antd";
import { createElement } from "react";

const { useToken } = theme;

const { Text } = Typography;
const aboutUs = [
  {
    title: "FAST DELIVERY",
    desc: "Fast delivery for all orders",
    icon: CarOutlined,
  },
  {
    title: "CUSTOMER SUPPORT",
    desc: "Friendly 24/7 customer support",
    icon: CustomerServiceOutlined,
  },
  {
    title: "MONEY BACK GUARANTEE",
    desc: "We return money if product not received",
    icon: SafetyCertificateOutlined,
  },
];

const About = () => {
  const { token } = useToken();

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 3,
      }}
      dataSource={aboutUs}
      renderItem={(about) => (
        <List.Item>
          <Flex gap={10} justify="center">
            {createElement(about.icon, {
              style: { fontSize: 30, color: token.colorText },
            })}
            <Flex vertical>
              <Text strong>{about.title}</Text>
              <Text>{about.desc}</Text>
            </Flex>
          </Flex>
        </List.Item>
      )}
    />
  );
};

export default About;
