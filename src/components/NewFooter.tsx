import { Flex, List, Typography, theme } from "antd";
import { Footer } from "antd/es/layout/layout";

const { Text } = Typography;
const { useToken } = theme;
const footerData = [
  { title: "Company", option1: "About us", option2: "Contact us" },
  { title: "Legal", option1: "Term of use", option2: "Private Police" },
  { title: "Social", option1: "Facebook", option2: "Instagram" },
];

const NewFooter = () => {
  const { token } = useToken();
  return (
    <Footer
      style={{ textAlign: "center", backgroundColor: token.colorBgContainer }}
    >
      <div style={{ padding: 40 }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={footerData}
          renderItem={(item) => (
            <List.Item>
              <Flex vertical justify="center">
                <Text strong>{item.title}</Text>
                <Text>{item.option1}</Text>
                <Text>{item.option2}</Text>
              </Flex>
            </List.Item>
          )}
        />
      </div>
    </Footer>
  );
};

export default NewFooter;
