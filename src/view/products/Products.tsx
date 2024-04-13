import { Flex, Input, Layout, theme } from "antd";
import { useSearchParams } from "react-router-dom";

import Sidebar from "./Sidebar";
import ProductList from "./ProductList";

const { Search } = Input;
const { useToken } = theme;
const { Content, Sider } = Layout;

const Products = () => {
  const { token } = useToken();

  return (
    <Flex gap={25}>
      <Sider
        width="15%"
        style={{
          backgroundColor: token.colorBgContainer,
          height: "min-content",
          borderRadius: 10,
        }}
      >
        <Sidebar />
      </Sider>
      <Content>
        <SearchInput />
        <br />
        <ProductList />
      </Content>
    </Flex>
  );
};

export default Products;

const SearchInput = () => {
  const [_, setSearchParams] = useSearchParams({
    search: "",
    page:"1"
  });

  function onSearch(value: string) {
    setSearchParams(
      (prev) => {
        prev.set("search", value);
        prev.set("page","1");
        return prev;
      },
      { replace: true }
    );
  }

  return (
    <Flex justify="flex-end">
      <Search
        placeholder="input search text"
        style={{ width: 300 }}
        onSearch={onSearch}
      />
    </Flex>
  );
};
