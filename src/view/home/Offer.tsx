import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row, Space, Typography, theme } from "antd";

import classes from "./home.module.css";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;
const { Text, Title } = Typography;
const offers = [
  {
    title: "LikeLife Audio & Secure Fit",
    desc: "Engineered for your best workout yet",
  },
  {
    title: "Big Zoom,No Problem",
    desc: "Up close, in tight,and worry free",
  },
  {
    title: "LikeLife Audio & Secure Fit",
    desc: "Engineered for your best workout yet",
  },
];

const Offer = () => {
  const navigate=useNavigate()
  const { token } = useToken();
  return (
    <div>
      <Row gutter={40}>
        {offers.map((offer, index) => {
          return (
            <Col key={index} span={6}>
              <Flex
                gap={10}
                justify="space-between"
                className={classes.card}
                style={{ borderColor: token.colorBorder,backgroundColor:token.colorBgElevated }}
              >
                <Flex vertical>
                  <Title level={4}>{offer.title}</Title>
                  <Text>{offer.desc}</Text>
                  <br />
                  <Space>
                    <Button type="link" onClick={()=>navigate("/products")} style={{ padding: 0 }}>
                      Discover <RightOutlined />
                    </Button>
                  </Space>
                </Flex>
                <div className={classes.img} />
              </Flex>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Offer;
