import { Button, Typography } from "antd";

import bannerImg from "../../assets/banner.jpg";

const { Text, Title } = Typography;

const Banner = () => {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          translate: "0 -50%",
          left: 50,
        }}
      >
        <Title style={{color:"white"}}>Great Deal</Title>
        <Text style={{color:"white"}}>
          High-quality product and service with price reduction compared to the
          item's regular or market price
        </Text>
        <br/>
        <br/>
        <Button style={{color:"black",backgroundColor:"white",border:0}}>Shop Now</Button>
      </div>
      <img src={bannerImg} style={{ width: "100%", height: 300 }} />
    </div>
  );
};

export default Banner;
