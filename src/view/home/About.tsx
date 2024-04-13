import {
  CarOutlined,
  CustomerServiceOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Col, Flex, Row, Typography, theme } from "antd";

const { useToken } = theme;

const { Text } = Typography;

const About = () => {
  const { token } = useToken();
  return (
    <div>
      <Row>
        <Col span={8}>
          <Flex gap={10} justify="center">
            <CarOutlined style={{ fontSize: 30, color: token.colorText }} />
            <Flex vertical>
              <Text strong>FAST DELIVERY</Text>
              <Text>Fast delivery for all orders</Text>
            </Flex>
          </Flex>
        </Col>
        <Col span={8}>
          <Flex gap={10} justify="center">
            <CustomerServiceOutlined
              style={{ fontSize: 30, color: token.colorText }}
            />
            <Flex vertical>
              <Text strong>CUSTOMER SUPPORT</Text>
              <Text>Friendly 24/7 customer support</Text>
            </Flex>
          </Flex>
        </Col>
        <Col span={8}>
          <Flex gap={10} justify="center">
            <SafetyCertificateOutlined
              style={{ fontSize: 30, color: token.colorText }}
            />
            <Flex vertical>
              <Text strong>MONEY BACK GUARANTEE</Text>
              <Text>We return money if product not received</Text>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default About;
