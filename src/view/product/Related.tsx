import Meta from "antd/es/card/Meta";
import { Card, Flex, List, Tag, Typography, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getRelatedProducts } from "../../api/product";
import { StarFilled } from "@ant-design/icons";

const { useNotification } = notification;
const { Title, Text } = Typography;
interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  images: [string];
}

const Related = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [api, contextHolder] = useNotification();

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["RelatedProducts"],
    queryFn: () => getRelatedProducts(id || ""),
  });

  useEffect(() => {
    if (error) {
      showNotification(error.message);
    }
  }, [error]);

  return (
    <div>
      {contextHolder}
      <Title level={4}>Related Products</Title>
      <br />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 5,
          xxl: 7,
        }}
        loading={isLoading}
        dataSource={isSuccess ? data.data.products : []}
        renderItem={(product: IProduct) => (
          <List.Item>
            <Card
              hoverable
              onClick={() => navigate(`/products/${product._id}`)}
              style={{ overflow: "hidden" }}
              cover={
                <img
                  alt="example"
                  src={`${import.meta.env.VITE_API_BACKEND_URL}${
                    product.images[0]
                  }`}
                  style={{ height: 238, width: "100%" }}
                />
              }
            >
              <div>
                <Meta
                  title={product.name}
                  description={
                    <Flex align="center" justify="space-between">
                      <Flex gap={5} align="end">
                        <Text strong style={{ color: "#389E0D", fontSize: 17 }}>
                          {product.price}
                        </Text>
                        <Text> ETB </Text>
                      </Flex>

                      {/* <Tag
                        style={{
                          padding: "5px 10px",
                          borderRadius: 20,
                          cursor: "pointer",
                        }}
                      >
                        <StarFilled style={{ color: "gold" }} />
                        {product.rating} Starts
                      </Tag> */}
                    </Flex>
                  }
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Related;
