import Meta from "antd/es/card/Meta";
import { Card, List, Typography, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getRelatedProducts } from "../../api/product";

const { useNotification } = notification;
const { Title } = Typography;
interface IProduct {
  _id: string;
  name: string;
  description: string;
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
              onClick={() => navigate(`./${product._id}`)}
              style={{ overflow: "hidden" }}
              cover={
                <img
                  alt="example"
                  src={`${import.meta.env.VITE_API_BACKEND_URL}${product.images[0]}`}
                  style={{ height: 238, width: "100%" }}
                />
              }
            >
              <div>
                <Meta title={product.name} description={product.description} />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Related;
