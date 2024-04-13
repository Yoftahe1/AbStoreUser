import { Col, Flex, Row, Typography, theme } from "antd";
import { Footer } from "antd/es/layout/layout";

const { Text } = Typography;
const { useToken } = theme;

const NewFooter = () => {
  const { token } = useToken();
  return (
    <Footer
      style={{ textAlign: "center", backgroundColor: token.colorBgContainer }}
    >
      <div style={{ padding: 40 }}>
        <Row>
          <Col span={6}>
            <Flex vertical align="flex-start">
              <Text>
                Making the world a better place through constructing elegant
              </Text>
              <Text>
                solutions on the internet, and empowering consumers with the
                voice
              </Text>
              <Text>of the people and the compass of consumer choice.</Text>
            </Flex>
            <Text></Text>
          </Col>
          <Col span={6}>
            <Flex justify="center">
              <Flex vertical align="flex-start">
                <Text strong>Company</Text>
                <Text>About us</Text>
                <Text>Contact us</Text>
              </Flex>
            </Flex>
          </Col>
          <Col span={6}>
            <Flex justify="center">
              <Flex vertical align="flex-start">
                <Text strong>Legal</Text>
                <Text>Term of use</Text>
                <Text>Private Police</Text>
              </Flex>
            </Flex>
          </Col>
          <Col span={6}>
            <Flex justify="center">
              <Flex vertical align="flex-start">
                <Text strong>Social</Text>
                <Text>Facebook</Text>
                <Text>Instagram</Text>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default NewFooter;
