import {
  Avatar,
  Card,
  Carousel,
  Col,
  Flex,
  Row,
  Typography,
  theme,
} from "antd";

import { catagories } from "../../constant/constant";
import classes from "./home.module.css";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;
const { useToken } = theme;

const Categories = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  return (
    <div>
      <Title level={4}>Featured Categories</Title>
      <br />
      <Carousel autoplay dots={false}>
        <div>
          <Row gutter={16}>
            {catagories.map((category, index) => {
              return (
                <Col
                  span={2}
                  key={index}
                  onClick={() =>
                    navigate(`/products?category=${category.title}`)
                  }
                  className={classes.category}
                  style={{ borderColor: token.colorBorder }}
                >
                  <Flex justify="center" align="center" gap={10} vertical>
                    <Card>
                      <Avatar
                        shape="square"
                        src={category.img}
                        style={{
                          width: 80,
                          height: 80,
                        }}
                      />
                    </Card>
                    <Text strong>{category.title}</Text>
                  </Flex>
                  <br />
                </Col>
              );
            })}
          </Row>
        </div>
      </Carousel>
    </div>
  );
};

export default Categories;
