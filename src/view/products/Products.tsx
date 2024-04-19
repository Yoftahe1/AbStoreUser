import { Flex, Input, Select } from "antd";
import { useSearchParams } from "react-router-dom";

import ProductList from "./ProductList";
import { ratings, selectCatagories } from "../../constant/constant";

const { Search } = Input;

const Products = () => {
  return (
    <Flex vertical gap={16}>
      <Flex justify="space-between" gap={16}>
        <Flex gap={16}>
          <Catagories />
          <Rating />
        </Flex>
        <SearchInput />
      </Flex>
      <ProductList />
    </Flex>
  );
};

export default Products;

const Catagories = () => {
  const [_, setSearchParams] = useSearchParams({
    category: "",
    page: "1",
  });

  const handleChange = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.set("category", value);
        prev.set("page", "1");
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <Select
      defaultValue={""}
      placeholder="select category"
      style={{ width: 150 }}
      onChange={handleChange}
      options={[{ value: "", label: "All" }, ...selectCatagories]}
    />
  );
};

const Rating = () => {
  const [_, setSearchParams] = useSearchParams({
    rating: "",
    page: "1",
  });

  const handleChange = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.set("rating", value);
        prev.set("page", "1");
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <Select
      defaultValue={""}
      placeholder="select category"
      style={{ width: 150 }}
      onChange={handleChange}
      options={ratings}
    />
  );
};

const SearchInput = () => {
  const [_, setSearchParams] = useSearchParams({
    search: "",
    page: "1",
  });

  function onSearch(value: string) {
    setSearchParams(
      (prev) => {
        prev.set("search", value);
        prev.set("page", "1");
        return prev;
      },
      { replace: true }
    );
  }

  return (
    <Search
      placeholder="input search text"
      style={{ width: 300 }}
      onSearch={onSearch}
    />
  );
};
