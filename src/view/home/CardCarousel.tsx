import { Card, Empty, Flex, Tag, Spin, Typography, notification } from "antd";

import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { getNewProducts, getTopRatedProducts } from "../../api/product";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { StarFilled } from "@ant-design/icons";

const { Meta } = Card;
const { Title, Text } = Typography;
const { useNotification } = notification;

interface CardCarousel {
  title: string;
}

const CardCarousel = ({ title }: CardCarousel) => {
  const navigate = useNavigate();
  const [api, contextHolder] = useNotification();

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const { error, isSuccess, isLoading, data } = useQuery({
    queryKey: [{ title }],
    queryFn: () =>
      title === "New Products" ? getNewProducts() : getTopRatedProducts(),
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      showNotification(error.message);
    }
  }, [error]);

  return (
    <div>
      {contextHolder}
      <Title level={4}> {title}</Title>
      <br />
      <Flex gap={16} style={{ overflowX: "auto" }}>
        {isSuccess ? (
          data.data.products.map(
            (
              {
                _id,
                name,
                price,
                images,
                rating,
              }: {
                _id: string;
                name: string;
                price: number;
                images: string[];
                rating: number;
              },
              index: number
            ) => (
              <Card
                key={index}
                hoverable
                onClick={() => navigate(`products/${_id}`)}
                cover={
                  <img
                    alt="example"
                    src={`${import.meta.env.VITE_API_BACKEND_URL}${images[0]}`}
                    style={{
                      width: 238,
                    }}
                  />
                }
              >
                <div>
                  <Meta
                    title={name}
                    description={
                      <Flex align="center" justify="space-between">
                        <Flex gap={5} align="end">
                          <Text
                            strong
                            style={{ color: "#389E0D", fontSize: 17 }}
                          >
                            {price}
                          </Text>
                          <Text> ETB </Text>
                        </Flex>

                        <Tag
                          style={{
                            padding: "5px 10px",
                            borderRadius: 20,
                            cursor: "pointer",
                          }}
                        >
                          <StarFilled style={{ color: "gold" }} />
                          {rating.toFixed(2)} Starts
                        </Tag>
                      </Flex>
                    }
                  />
                </div>
              </Card>
            )
          )
        ) : (
          <div style={{ width: "100%" }}>
            <Spin spinning={isLoading}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{
                  height: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Spin>
          </div>
        )}
      </Flex>
      <br />
    </div>
  );
};

export default CardCarousel;
