import { RightOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Flex, List, Typography } from "antd";

import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;
const offers = [
  {
    title: "LikeLife Audio & Secure Fit",
    desc: "Engineered for your best workout yet",
    img:""
  },
  {
    title: "Big Zoom,No Problem",
    desc: "Up close, in tight,and worry free",
    img:""

  },
  {
    title: "LikeLife Audio & Secure Fit",
    desc: "Engineered for your best workout yet",
    img:""
  },
];

const Offer = () => {
  const navigate = useNavigate();
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      dataSource={offers}
      renderItem={(offer) => (
        <List.Item>
          <Card>
            <Flex gap={10} align="center" justify="space-between">
              <Flex vertical align="flex-start">
                <Title level={5}>{offer.title}</Title>
                <Text>{offer.desc}</Text>
                <br />
                <Button
                  type="link"
                  onClick={() => navigate("/products")}
                  style={{ padding: 0 }}
                >
                  Discover <RightOutlined />
                </Button>
              </Flex>
              <Avatar src={offer.img} shape="square" size={115} />
            </Flex>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Offer;
