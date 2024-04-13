import { Button, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      gap={10}
      style={{ height: "100vh" }}
      align="center"
      justify="center"
    >
      <Title
        style={{
          margin: 0,
          fontSize: 250,
          fontWeight: "bolder",
          color: "#1677FF",
        }}
      >
        Oops!
      </Title>
      <Title style={{ fontWeight: "bold" }}>404 - PAGE NOT FOUND</Title>
      <Text>The page you are looking for might have been removed</Text>
      <Button
        type="primary"
        size="large"
        shape="round"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </Flex>
  );
};

export default NotFound;
