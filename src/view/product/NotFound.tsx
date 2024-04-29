import { useNavigate } from "react-router-dom";
import { Button, Flex, Typography } from "antd";

const { Title, Text } = Typography;

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Flex vertical align="center" gap={10}>
      <Title level={2}>Something went wrong</Title>
      <Text>Please try again later</Text>
      <Button
        type="primary"
        onClick={() => navigate("/products", { replace: true })}
      >
        Go to products
      </Button>
    </Flex>
  );
};

export default NotFound;
