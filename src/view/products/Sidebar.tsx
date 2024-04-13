import type { RadioChangeEvent } from "antd";
import { Radio, Space, Typography } from "antd";
import { useSearchParams } from "react-router-dom";

import { catagories, ratings } from "../../constant/constant";

const { Title, Text } = Typography;

const Sidebar = () => {
  return (
    <div style={{ padding: 10 }}>
      <Title level={5} style={{ textAlign: "center" }}>
        Filter
      </Title>
      <Text strong>Catagories</Text>
      <Catagories />
      <br />
      <Text strong>Ratings</Text>
      <Rating />
    </div>
  );
};

export default Sidebar;

const Rating = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    rating: "",
    page:"1"
  });

  const selectedRating = searchParams.get("rating");

  function handelChange(e: RadioChangeEvent) {
    setSearchParams(
      (prev) => {
        prev.set("rating", e.target.value);
        prev.set("page","1");
        return prev;
      },
      { replace: true }
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <Radio.Group onChange={handelChange} value={selectedRating}>
        <Space direction="vertical">
          {ratings.map((rating, index) => {
            return (
              <Radio key={index} value={rating.value}>
                {rating.label}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

const Catagories = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    category: "",
    page:"1"
  });

  const selectedCategory = searchParams.get("category");

  function handelChange(e: RadioChangeEvent) {
    setSearchParams(
      (prev) => {
        prev.set("category", e.target.value);
        prev.set("page","1");
        return prev;
      },
      { replace: true }
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <Radio.Group onChange={handelChange} value={selectedCategory}>
        <Space direction="vertical">
          {[{img:"",title:""},...catagories].map((category, index) => {
            return (
              <Radio key={index} value={category.title}>
                {category.title===""?"All":category.title}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};
