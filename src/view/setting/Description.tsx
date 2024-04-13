import { Flex, Avatar, Typography } from "antd";
import { ReactNode } from "react";

const { Text } = Typography;

interface IDescription {
  title: string;
  message: string;
  icon: ReactNode;
}
const Description = ({ title, message, icon }: IDescription) => {
  return (
    <Flex align="center" gap={15}>
      <Avatar size={40} style={{ backgroundColor: "#1677ff" }}>
        {icon}
      </Avatar>
      <Flex vertical>
        <Text strong>{title}</Text>
        <Text type="secondary">{message}</Text>
      </Flex>
    </Flex>
  );
};

export default Description;
