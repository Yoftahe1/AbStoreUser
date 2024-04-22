import { Flex, Input, Select } from "antd";
import { useSearchParams } from "react-router-dom";

import ProductList from "./ProductList";
import { ratings, selectCatagories } from "../../constant/constant";

const { Search } = Input;

const Products = () => {
  return (
    <Flex vertical gap={16}>
      <Flex justify="space-around" gap={16} wrap="wrap">
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
  const [searchParams, setSearchParams] = useSearchParams({
    category: "",
    page: "1",
  });
  const selectedCategory = searchParams.get("category") || "";

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
      defaultValue={selectedCategory}
      placeholder="select category"
      style={{ width: 150 }}
      onChange={handleChange}
      options={[{ value: "", label: "All" }, ...selectCatagories]}
    />
  );
};

const Rating = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    rating: "",
    page: "1",
  });
  const selectedRating = searchParams.get("rating") || "";

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
      defaultValue={selectedRating}
      placeholder="select category"
      style={{ width: 150 }}
      onChange={handleChange}
      options={ratings}
    />
  );
};

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    page: "1",
  });

  const searchInput = searchParams.get("search") || "";

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
      defaultValue={searchInput}
      placeholder="input search text"
      style={{ width: 316 }}
      onSearch={onSearch}
    />
  );
};
