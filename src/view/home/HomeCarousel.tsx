import { useNavigate } from "react-router-dom";
import { Button, Carousel, Flex, Typography } from "antd";

import pc from "../../assets/carousel/pc.webp";
import tv from "../../assets/carousel/tv.webp";
import set from "../../assets/carousel/set.webp";

import classes from "./home.module.css";

const { Text, Title } = Typography;

const carouselData = [
  {
    image: tv,
    color: "white",
    positionRight: false,
    url: "/products?category=Tv&page=1",
    title: "Tv when it's on. Art when it's off",
    desc: "The only tv you need, offering convenience, versatility, and exceptional performance in a single device",
  },
  {
    image: pc,
    color: "black",
    positionRight: true,
    url: "/products?category=Pc&page=1",
    title: "Experience ultra performance",
    desc: "Enhanced features, style and top-tire functionality for the most demanding tasks",
  },

  {
    image: set,
    color: "black",
    positionRight: false,
    url: "/products",
    title: "Find all you need in one place",
    desc: "Streamline your search and find everything you need in one convenient location",
  },
];

const HomeCarousel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Carousel autoplay>
      {carouselData.map((data, index) => (
        <div key={index} >
          <div style={{ position: "relative" }}>
            <Flex
              vertical
              align="flex-start"
              className={
                data.positionRight
                  ? classes.positionRight
                  : classes.positionLeft
              }
            >
              <Title style={{ color: data.color, fontSize: 50 }}>
                {data.title}
              </Title>
              <Text style={{ color: data.color }}>{data.desc}</Text>
              <br />
              <Button type="primary" onClick={() => navigate(data.url)}>
                Shop Now
              </Button>
            </Flex>

            <img src={data.image} style={{ width: "100%" }} />
          </div>
        </div>
      ))}
    </Carousel>
  );
};
export default HomeCarousel;
