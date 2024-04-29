import { useEffect, useState } from "react";

import SwiperCore from "swiper/core";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Flex, Tag, Typography, notification } from "antd";
import { Navigation, Thumbs, FreeMode, Controller } from "swiper/modules";

import Rating from "./Rating";
import Review from "./Review";
import Loading from "./Loading";
import NotFound from "./NotFound";
import OrderForm from "./OrderForm";
import { findOneProduct } from "../../api/product";

import "swiper/css";

import classes from "./product.module.css";

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

  const { error, isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["Product", { id }],
    queryFn: () => findOneProduct(id || ""),
  });

  useEffect(() => {
    if (error) {
      showNotification(error.message);
    }
  }, [error]);

  if (isLoading)
    return (
      <>
        {contextHolder}
        <Loading />
      </>
    );

  if (isError)
    return (
      <>
        {contextHolder}
        <NotFound />
      </>
    );

  return (
    <>
      {contextHolder}
      <div className={classes.desc}>
        <div className={classes.container}>
          <ImageSlide images={data.data.product.images} />
        </div>
        <Flex vertical gap={14} className={classes.container}>
          <Title
            level={1}
            style={{ margin: 0, padding: 0, textTransform: "capitalize" }}
          >
            {data.data.product.name}
          </Title>
          <Flex align="flex-start" justify="space-between">
            <Title level={3}>{isSuccess && data.data.product.price} ETB</Title>
            <Flex gap={10}>
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
          <Text strong type="secondary">
            {data.data.product.description}
          </Text>
          <Flex align="flex-start" gap={5}>
            <Title level={5}>Category:</Title>
            <Tag
              color="purple"
              style={{ padding: "5px 20px", borderRadius: 20 }}
            >
              {data.data.product.category}
            </Tag>
          </Flex>
          {data.data.product.types.length > 0 ? (
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
        </Flex>
      </div>
    </>
  );
};

export default Desc;

SwiperCore.use([FreeMode, Navigation, Thumbs]);

function ImageSlide({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  return (
    <div style={{ display: "flex" }}>
      <Swiper
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        style={{ width: "80%", borderRadius: 10 }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${import.meta.env.VITE_API_BACKEND_URL}${img}`}
              style={{
                width: "100%",
                borderRadius: 10,
                border: "1px solid #F0F0F0",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{ width: 16 }} />
      <Swiper
        spaceBetween={16}
        slidesPerView={4}
        onSwiper={setThumbsSwiper}
        direction="vertical"
        modules={[Navigation, Thumbs, Controller]}
        style={{ width: "20%" }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${import.meta.env.VITE_API_BACKEND_URL}${img}`}
              style={{
                height: "100%",
                borderRadius: 10,
                border: "1px solid #F0F0F0",
                cursor: "pointer",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
