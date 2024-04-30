import { RightOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Flex, List, Typography } from "antd";

import { useNavigate } from "react-router-dom";

import s23 from "../../assets/offer/s23.avif";
import buds from "../../assets/offer/buds.avif";
import flip from "../../assets/offer/flip.avif";

const { Text, Title } = Typography;
const offers = [
  {
    title: "Galaxy S23 Ultra",
    desc: "Ultra-fast photography and game-play",
    img: s23,
    url: "/products?category=Phone",
  },
  {
    title: "Galaxy Buds FE",
    desc: "Your everyday audio companion",
    img: buds,
    url: "/products?category=EarBud",
  },
  {
    title: "Galaxy Z Flip",
    desc: "FlexCam Selfies.Even when closed",
    img: flip,
    url: "/products?category=Phone",
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
                  onClick={() => navigate(offer.url)}
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
