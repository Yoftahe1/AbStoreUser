import {
  Card,
  Flex,
  theme,
  Avatar,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";

import { catagories } from "../../constant/constant";

import classes from "./home.module.css";

const { Text, Title } = Typography;
const { useToken } = theme;

const Categories = () => {
  const navigate = useNavigate();
  const { token } = useToken();

  return (
    <div>
      <Title level={4}>Featured Categories</Title>
      <br />
      <Flex gap={16} style={{ overflowX: "auto" }}>
        {catagories.map((category, index) => (
          <Flex
            key={index}
            justify="center"
            align="center"
            gap={10}
            vertical
            className={classes.category}
            style={{ borderColor: token.colorBorder }}
            onClick={() => navigate(`/products?category=${category.title}`)}
          >
            <Card>
              <Avatar shape="square" src={category.img} size={80} />
            </Card>
            <Text strong>{category.title}</Text>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default Categories;
