import { useEffect } from "react";

import { List, Card, notification, Flex, Tag, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getProducts } from "../../api/product";
import { StarFilled } from "@ant-design/icons";

const { Meta } = Card;
const { Text } = Typography;
const { useNotification } = notification;

interface IProduct {
  _id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  images: [string];
}

const ProductList = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const filter = {
    page: searchParams.get("page") || "1",
    category: searchParams.get("category") || undefined,
    rating: searchParams.get("rating") || undefined,
    search: searchParams.get("search") || undefined,
  };

  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["Products", { ...filter }],
    queryFn: () => getProducts(filter),
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      showNotification(error.message);
    }
  }, [error]);

  return (
    <>
      {contextHolder}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6,
        }}
        loading={isLoading}
        pagination={{
          onChange: (newPage: number) => {
            setSearchParams(
              (prev) => {
                prev.set("page", newPage.toString());
                return prev;
              },
              { replace: true }
            );
          },
          total: isSuccess ? data.data.totalCount : 10,
          pageSize: 10,
          current: Number(searchParams.get("page")) || 1,
        }}
        dataSource={isSuccess ? data.data.products : []}
        renderItem={(product: IProduct) => (
          <List.Item>
            <Card
              hoverable
              onClick={() => navigate(`./${product._id}`)}
              style={{ overflow: "hidden" }}
              cover={
                <img
                  alt="example"
                  src={`${import.meta.env.VITE_API_BACKEND_URL}${
                    product.images[0]
                  }`}
                  // style={{ height: 238, width: "auto" }}
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

                      <Tag
                        style={{
                          padding: "5px 10px",
                          borderRadius: 20,
                          cursor: "pointer",
                        }}
                      >
                        <StarFilled style={{ color: "gold" }} />
                        {product.rating.toFixed(2)} Starts
                      </Tag>
                    </Flex>
                  }
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default ProductList;
