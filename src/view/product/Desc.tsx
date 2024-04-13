import { useEffect, useState } from "react";

import SwiperCore from "swiper/core";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Flex, Skeleton, Tag, Typography, notification } from "antd";
import { Navigation, Thumbs, FreeMode, Controller } from "swiper/modules";

import Rating from "./Rating";
import Review from "./Review";
import OrderForm from "./OrderForm";
import { findOneProduct } from "../../api/product";

import "swiper/css";

const { Title, Text } = Typography;
const { useNotification } = notification;

const Desc = () => {
  const { id } = useParams();
  const [api, contextHolder] = useNotification();

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["Product", { id }],
    queryFn: () => findOneProduct(id || ""),
  });

  useEffect(() => {
    if (error) {
      showNotification(error.message);
    }
  }, [error]);

  return (
    <>
      {contextHolder}

      <Flex gap={50} justify="center">
        <div style={{ width: "40%" }}>
          {isLoading ? (
            <Skeleton.Avatar shape="square" style={{ flex: 1 }} />
          ) : (
            <ImageSlide images={data.data.product.images} />
          )}
        </div>
        <Flex vertical gap={14} style={{ width: "40%" }}>
          <Skeleton loading={isLoading} paragraph={{ rows: 1 }}>
            <Title level={1} style={{ margin: 0, padding: 0,textTransform:"capitalize" }}>
              {isSuccess && data.data.product.name}
            </Title>
          </Skeleton>
          <Skeleton loading={isLoading}>
            <Flex align="flex-start" justify="space-between">
              <Title level={3}>
                {isSuccess && data.data.product.price} ETB
              </Title>
              <Flex>
                <Rating
                  id={isSuccess ? data.data.product._id : ""}
                  totalRating={isSuccess ? data.data.product.rating : 0}
                />
                <Review
                  id={isSuccess ? data.data.product._id : ""}
                  reviewCount={isSuccess ? data.data.product.reviewCount : 0}
                />
              </Flex>
            </Flex>
          </Skeleton>
          <Skeleton loading={isLoading}>
            <Text strong type="secondary">
              {isSuccess && data.data.product.description}
            </Text>

            <Flex align="flex-start" vertical gap={5}>
              <Title level={5}>Category:</Title>
              <Tag
                color="purple"
                style={{ padding: "5px 20px", borderRadius: 20 }}
              >
                {isSuccess && data.data.product.category}
              </Tag>
            </Flex>

            {isSuccess && data.data.product.types.length > 0 ? (
              <OrderForm
                types={data.data.product.types}
                price={data.data.product.price}
                name={data.data.product.name}
                img={data.data.product.images[0]}
                id={data.data.product._id}
              />
            ) : (
              <Tag
                style={{
                  padding: "5px 20px",
                  borderRadius: 20,
                  width: "min-content",
                }}
                color="error"
              >
                Out of Stock
              </Tag>
            )}
          </Skeleton>
        </Flex>
      </Flex>
    </>
  );
};

export default Desc;

SwiperCore.use([FreeMode, Navigation, Thumbs]);

function ImageSlide({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  return (
    <div style={{display:"flex"}}>
      <Swiper
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        style={{width:"80%",borderRadius: 10}}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${import.meta.env.VITE_API_BACKEND_URL}${img}`}
              style={{ width: "100%", borderRadius: 10 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{width:16}}/>
      <Swiper
        spaceBetween={16}
        slidesPerView={4}
        onSwiper={setThumbsSwiper}
        direction="vertical"
        modules={[Navigation, Thumbs, Controller]}
        style={{width:"20%"}}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${import.meta.env.VITE_API_BACKEND_URL}${img}`}
              style={{ height: "100%", borderRadius: 10 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
